from .models import Job
from rest_framework import serializers, viewsets, permissions
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = JobSerializer

    def get_queryset(self):
        return self.request.user.jobs.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)