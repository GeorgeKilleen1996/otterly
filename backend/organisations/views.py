from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Organisation
from .serializers import OrganisationSerializer


# Organisation views
class OrganisationViewSet(viewsets.ModelViewSet):
    serializer_class = OrganisationSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            queryset = Organisation.objects.all()
        else:
            queryset = Organisation.objects.filter(users=user)
        return queryset
