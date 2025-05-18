from rest_framework import viewsets, permissions, views, mixins
from rest_framework.authtoken.models import Token
from accounts import serializers
from django.views import View
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import login, load_backend, get_user_model
from django.conf import settings
from rest_framework.response import Response

# Email verification imports
from .models import EmailVerificationToken
from .serializers import VerifyEmailSerializer
from .utils import send_verification_email

User = get_user_model()


def login_user(request, user):
    if not hasattr(user, "backend"):
        for backend in settings.AUTHENTICATION_BACKENDS:
            if user == load_backend(backend).get_user(user.id):
                user.backend = backend
                break
    if hasattr(user, "backend"):
        return login(request, user)


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

    # TODO: Create token for the user
    @action(detail=False, methods=["post"], url_path="generate-token")
    def generate_token(self, request):
        try:
            user = get_object_or_404(User, email=request.data["email"])
            token = EmailVerificationToken.objects.create(user=user)
            # send_verification_email(user, token, self.request)
            return Response(
                {
                    "status": 200,
                    "message": "Token generated successfully",
                },
                status=200,
            )
        except Exception as e:
            return Response(
                {
                    "status": 500,
                    "message": "Error generating token",
                },
                status=500,
            )

    # TODO: Verify email

    # TODO: Resend verification email


class AuthTokenView(views.APIView):
    serializer_class = serializers.LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user = get_object_or_404(User, email=request.data["email"])

        if not user.check_password(request.data["password"]):
            return Response(
                {
                    "status": 401,
                    "message": "Invalid Login Credentials",
                },
                status=401,
            )

        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "status": 200,
                "message": "Login successful",
                "data": {
                    "token": token.key,
                    "is_verified": user.is_verified,
                    "two_factor_required": "false",
                },
            },
            status=200,
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
