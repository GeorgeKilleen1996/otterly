from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Orgnisation model
class Organisation(models.Model):
    name = models.CharField(max_length=255, unique=True)
    users = models.ManyToManyField(
        User,
        related_name="organisations",
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Organisation"
        verbose_name_plural = "Organisations"
        ordering = ["created_at"]
