from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

import os
import base64


def send_verification_email(user, token):
    """Send verification email to user with token"""

    html_message = render_to_string(
        "email/verification_email.html",
        {
            "first_name": user.first_name,
            "email": user.email,
            "verification_code": token.token,
            "expiry_minutes": 30,
            "verification_link": f"{settings.FRONTEND_URL}auth/verify?token={token.token}",
            "site_name": settings.SITE_NAME,
            "site_url": settings.SITE_URL,
        },
    )

    subject = f"Verify your email address for {settings.SITE_NAME}"

    plain_message = strip_tags(html_message)

    # Send email
    send_mail(
        subject,
        plain_message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=html_message,
        fail_silently=False,
    )

    # Mark token as sent
    token.mark_as_sent()
