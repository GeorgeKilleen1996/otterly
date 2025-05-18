from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_verification_email(user, token, request):
    """Send verification email to user with token"""
    # Get the domain from request
    domain = request.get_host()
    protocol = "https" if request.is_secure() else "http"

    # Create verification URL - redirecting to frontend
    frontend_url = settings.FRONTEND_URL  # Define this in your settings.py

    # Email subject and content
    subject = "Verify your email address"

    # You can use an HTML template
    html_message = render_to_string(
        "email/verification_email.html",
        {
            "user": user,
            "verification_code": token.token,
            "expiry_minutes": 30,
        },
    )

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
