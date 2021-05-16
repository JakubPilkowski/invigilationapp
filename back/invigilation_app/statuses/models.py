from django.db import models
from django.contrib.auth.models import User


class Status(models.Model):
    ACTIVE = 'ACT'
    INACTIVE = "INACT"
    OFFLINE = "OFF"
    NETWORK_ISSUE = "NTISS"
    STATES = [
        (ACTIVE, 'Aktywny'),
        (INACTIVE, 'Nieaktywny od'),
        (OFFLINE, 'Niedostępny'),
        (NETWORK_ISSUE, 'Ktos ma problemy z internetem')
    ]
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None)
    state = models.CharField(
        max_length=20,
        choices=STATES,
        default=OFFLINE
    )
    last_reaction_time = models.IntegerField()
    event = models.CharField(max_length=255)
    page = models.CharField(max_length=1000)

    class Meta:
        verbose_name = "Status"
        verbose_name_plural = "Statuses "

    def __str__(self):
        return '%s %s %s %s %s' % (self.user_id, self.state, self.last_reaction_time, self.event, self.page)
