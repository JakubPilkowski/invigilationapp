from rest_framework import serializers
from .models import Status


class StatusesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['url', 'user_id', 'state',
                  'last_reaction_time', 'event', 'page']
