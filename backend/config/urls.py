from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from accounts.urls import router as accounts_router
from organisations.urls import router as organisations_router


router = DefaultRouter()
router.registry.extend(accounts_router.registry)
router.registry.extend(organisations_router.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("", include("accounts.urls")),
]
