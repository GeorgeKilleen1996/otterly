from rest_framework import viewsets, permissions, views, mixins
from rest_framework.authtoken.models import Token
from accounts import serializers
from django.views import View
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import login, load_backend, get_user_model
from django.conf import settings
from rest_framework.response import Response

from organisations.serializers import OrganisationSerializer

# Email verification imports
from .models import EmailVerificationToken
from .utils import send_verification_email, verification_email_limiter

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
        if self.action == "create_user" or self.action == "check_email_availability":
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        instance: User = serializer.save()

        return instance

    @action(detail=False, methods=["post"], url_path="create")
    def create_user(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        organisationName = request.data.get("organisation_name", None)
        if not organisationName:
            return Response(
                {"status": 400, "message": "Organisation name is required."}, status=400
            )
        else:
            print("Organisation Name:", organisationName)
            # Create the user without verification
            user = self.perform_create(serializer)
            user.is_verified = False
            user.save()
            # Create the organisation and add the user to it
            organisation_serializer = OrganisationSerializer(
                data={"name": organisationName, "owner": user.id, "users": [user.id]}
            )
            organisation_serializer.is_valid(raise_exception=True)
            organisation_serializer.save()

            return Response(
                {
                    "status": 201,
                    "message": "User and organisation created successfully.",
                    "data": serializer.data,
                },
                status=201,
            )

    @action(detail=False, methods=["post"], url_path="available")
    def check_email_availability(self, request):
        email = request.data.get("email")
        if not email:
            return Response(
                {"status": 400, "message": "Email is required."}, status=400
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"status": 409, "message": "Email is taken. Please try another."},
                status=409,
            )
        else:
            return Response(
                {"status": 200, "message": "Email is available."}, status=200
            )

    @action(detail=False, methods=["get"], url_path="me")
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=["post"], url_path="generate-token")
    def generate_token(self, request):
        try:
            user = get_object_or_404(User, email=request.data["email"])
            if not verification_email_limiter(user):
                return Response(
                    {
                        "status": 429,
                        "message": "Too many token generation requests. Please try again later.",
                    },
                    status=429,
                )
            else:
                token = EmailVerificationToken.objects.create(user=user)
                send_verification_email(user, token)
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
                    "message": str(e),
                },
                status=500,
            )

    @action(detail=False, methods=["post"], url_path="verify-token")
    def verify_email(self, request):
        user = get_object_or_404(User, email=request.data["email"])
        token = EmailVerificationToken.objects.filter(
            token=request.data.get("token")
        ).first()

        if token and token.user == user:
            if not token.is_valid():
                return Response(
                    {
                        "status": 400,
                        "message": "Token has expired, please request a new token.",
                    },
                    status=400,
                )
            else:
                user.is_verified = True
                user.save()
                token.delete()
                return Response(
                    {
                        "status": 200,
                        "message": "Token verified successfully.",
                    },
                    status=200,
                )
        else:
            return Response(
                {
                    "status": 404,
                    "message": "Invalid token entered, please try again.",
                },
                status=404,
            )


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


class PasswordResetView(viewsets.GenericViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["post"], url_path="password-reset")
    def password_reset(self, request):
        user = get_object_or_404(User, email=request.data["email"])
        if not verification_email_limiter(user):
            return Response(
                {
                    "status": 429,
                    "message": "Too many password reset requests. Please try again later.",
                },
                status=429,
            )
        token = EmailVerificationToken.objects.create(user=user)
        send_verification_email(user, token, reset_password=True)
        return Response(
            {
                "status": 200,
                "message": "Password reset email sent successfully.",
            },
            status=200,
        )

    @action(detail=False, methods=["post"], url_path="verify-token")
    def verify_token(self, request):
        user = get_object_or_404(User, email=request.data["email"])
        token = EmailVerificationToken.objects.filter(
            token=request.data.get("token")
        ).first()

        if token and token.user == user:
            if not token.is_valid():
                return Response(
                    {
                        "status": 400,
                        "message": "Token has expired, please request a new token.",
                    },
                    status=400,
                )
            else:
                return Response(
                    {
                        "status": 200,
                        "message": "Token verified successfully.",
                    },
                    status=200,
                )
        else:
            return Response(
                {
                    "status": 404,
                    "message": "Invalid token entered, please try again.",
                },
                status=404,
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
