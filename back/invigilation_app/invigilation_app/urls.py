from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from statuses.views import StatusesViewSet

urlpatterns = [
    path('auth/', include('core.urls')),
    path('statuses/', include('statuses.urls')),
    path('admin/', admin.site.urls),
]
