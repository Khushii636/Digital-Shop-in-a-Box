from django.urls import path
from .views import ShopCreateAPIView

urlpatterns = [
    path('', ShopCreateAPIView.as_view(), name='shop-create'),
]
