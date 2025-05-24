from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from accounts.models import EmailVerificationToken
from django.utils import timezone
from datetime import timedelta
from email.mime.image import MIMEImage

import os


def attach_image(msg, image_path, content_id, filename):
    """
    Helper function to attach an image to an email.
    """
    try:
        with open(image_path, "rb") as img:
            img_data = img.read()
            image = MIMEImage(img_data)
            image.add_header("Content-ID", f"<{content_id}>")  # This is the CID
            image.add_header("Content-Disposition", "inline", filename=filename)
            msg.attach(image)
    except FileNotFoundError:
        raise FileNotFoundError(f"Image not found at path: {image_path}")


def send_verification_email(user, token):
    """
    Send verification email to user with token.
    """
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

    # Create the email
    msg = EmailMultiAlternatives(subject, "", settings.DEFAULT_FROM_EMAIL, [user.email])
    msg.attach_alternative(html_message, "text/html")

    # Attach header and footer images
    header_image_path = os.path.join(
        settings.BASE_DIR, "static", "images", "header-logo.png"
    )
    footer_image_path = os.path.join(
        settings.BASE_DIR, "static", "images", "footer-logo.png"
    )
    attach_image(msg, header_image_path, "header-logo", "header-logo.png")
    attach_image(msg, footer_image_path, "footer-logo", "footer-logo.png")

    # Actually send the email
    msg.send()

    # Mark token as sent
    token.mark_as_sent()


def verification_email_limiter(user):
    """
    Function to check whether the user has had 3 verification emails sent within the last 30 minutes.
    Returns True if the user can send a new verification email, False otherwise.
    """

    recent_tokens_count = EmailVerificationToken.objects.filter(
        user=user, expires_at__gte=timezone.now()
    ).count()

    print(f"Recent tokens count: {recent_tokens_count}")  # Debugging line

    return recent_tokens_count < 3
