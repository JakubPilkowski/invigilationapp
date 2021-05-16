from django.urls import path, include
from .views import StatusesViewSet
from rest_framework import routers
from rest_framework.routers import SimpleRouter

router = routers.SimpleRouter()
router.register(r'', StatusesViewSet)

urlpatterns = [
    path('', include(router.urls))
]
