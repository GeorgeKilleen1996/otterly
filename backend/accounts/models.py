from django.db import models

from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import UserManager

# Token imports
from datetime import timedelta

import random
import string


# User Model - user accounts
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(_("first name"), max_length=150, blank=False)
    last_name = models.CharField(_("last name"), max_length=150, blank=False)
    is_staff = models.BooleanField(_("staff status"), default=False)
    is_verified = models.BooleanField(_("verified"), default=False)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    created_at = models.DateTimeField(_("created at"), default=timezone.now)
    updated_at = models.DateTimeField(_("updated at"), default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name} - {self.email}"


# Email Verification Token Model - email verification and potentially OTP / password reset?
class EmailVerificationToken(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="verification_tokens"
    )
    token = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    last_sent_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = "".join(
                random.choices(string.ascii_uppercase + string.digits, k=6)
            )
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(minutes=30)
        return super().save(*args, **kwargs)

    def is_valid(self):
        return timezone.now() <= self.expires_at

    def can_resend(self):
        return timezone.now() >= (self.last_sent_at + timedelta(minutes=30))

    def mark_as_sent(self):
        self.last_sent_at = timezone.now()
        self.save(update_fields=["last_sent_at"])

    def __str__(self):
        return f"{self.token} - {self.user.email} - {self.is_valid() and 'Active' or 'Expired'}"
