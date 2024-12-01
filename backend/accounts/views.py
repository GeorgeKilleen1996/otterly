from rest_framework import viewsets, permissions, views, mixins
from rest_framework.authtoken.models import Token
from accounts import serializers
from django.views import View
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import login, load_backend, get_user_model
from django.conf import settings
from rest_framework.response import Response

User = get_user_model()

def login_user(request, user):
    if not hasattr(user, "backend"):
        for backend in settings.AUTHENTICATION_BACKENDS:
            if user == load_backend(backend).get_user(user.id):
                user.backend = backend
                break
    if hasattr(user, "backend"):
        return login(request, user)

class LoginView(views.APIView):
    """
    View used to log users in. Not to be used to register users, that's the
    POST endpoint on the UserViewSet.
    """
    serializer_class = serializers.LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """
        POST request to log a user in. Returns a token if successful.
        """

        user = get_object_or_404(User, email=request.get('email'))

        if not user.check_password(request.get('password')):
            return Response({'error': 'Invalid Credentials'}, status=400)

        token, _ = Token.objects.get_or_create(user=user)

        return Response({'token': token.key}, status=200)

# ! TODO: When creating a new user, send back the token so it saves making another request to login after registering.
class UserViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        # Only allow users to see their own profile
        return User.objects.filter(id=self.request.user.id)

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        instance: User = serializer.save()

        return instance

    @action(detail=False, methods=["get"], url_path="me")
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class AuthTokenView(views.APIView):
    serializer_class = serializers.LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user = get_object_or_404(User, email=request.data["email"])

        if not user.check_password(request.data["password"]):
            return Response({"error": "Invalid password"}, status=400)

        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "two_factor_required": False,
                "token": token.key,
            }
        )

class AdminLoginView(View):
    def get(self, request):
        token_str = request.GET.get("token", None)
        if token_str is not None:
            try:
                token = Token.objects.get(key=token_str)
                login_user(request, token.user)
            except Token.DoesNotExist:
                pass
        return redirect("/admin/")