from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Organisation
from accounts.serializers import UserSerializer

User = get_user_model()


# Organisation serializer
class OrganisationSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), required=False
    )

    class Meta:
        model = Organisation
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["users"] = UserSerializer(
            instance.users.all(), many=True, context=self.context
        ).data
        return rep
