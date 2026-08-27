import secrets
import string
from django.db import models
from django.conf import settings


def generate_shop_id():
    """Generates a random 10-character uppercase alphanumeric string."""
    alphabet = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(10))


class Shop(models.Model):
    shop_id = models.CharField(
        max_length=10,
        unique=True,
        default=generate_shop_id,
        editable=False
    )
    name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='shops'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.shop_id})"


class FeatureConfig(models.Model):
    shop = models.OneToOneField(
        Shop,
        on_delete=models.CASCADE,
        related_name='feature_config',
        primary_key=True
    )
    inventory = models.BooleanField(default=True)
    sales = models.BooleanField(default=True)
    customers = models.BooleanField(default=True)
    reports = models.BooleanField(default=True)

    def __str__(self):
        return f"FeatureConfig for {self.shop.name}"
