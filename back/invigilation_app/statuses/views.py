from rest_framework import permissions, viewsets
from rest_framework.response import Response
from .models import Status
from .serializers import StatusesSerializer


class StatusesViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
