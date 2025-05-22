from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from email.mime.image import MIMEImage

import os


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

    # Create the email
    msg = EmailMultiAlternatives(subject, "", settings.DEFAULT_FROM_EMAIL, [user.email])
    msg.attach_alternative(html_message, "text/html")

    # Attach an image to the email
    header_image = os.path.join(
        settings.BASE_DIR, "static", "images", "header-logo.png"
    )
    with open(header_image, "rb") as img:
        img_data = img.read()
        image = MIMEImage(img_data)
        image.add_header("Content-ID", "<header-logo>")  # This is the CID
        image.add_header("Content-Disposition", "inline", filename="header-logo.png")
        msg.attach(image)

    footer_image = os.path.join(
        settings.BASE_DIR, "static", "images", "footer-logo.png"
    )
    with open(footer_image, "rb") as img:
        img_data = img.read()
        image = MIMEImage(img_data)
        image.add_header("Content-ID", "<footer-logo>")  # This is the CID
        image.add_header("Content-Disposition", "inline", filename="footer-logo.png")
        msg.attach(image)

    msg.send()

    # Mark token as sent
    token.mark_as_sent()
