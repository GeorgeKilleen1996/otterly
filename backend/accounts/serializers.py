from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    """
    Serializer for the login view.
    """
    email = serializers.CharField(max_length=255, style={'input_type': 'email'})
    password = serializers.CharField(max_length=128, style={'input_type': 'password'})


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)
        if password is not None:
            user.set_password(password)
            user.save()

        return user

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "is_staff",
            "is_verified",
            "date_joined",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "is_staff", "date_joined", "created_at", "updated_at")
        extra_kwargs = {
            "company": {"required": False},
        }

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        return rep