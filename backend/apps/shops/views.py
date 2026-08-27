from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Shop, FeatureConfig
from .serializers import ShopSerializer


class ShopCreateAPIView(generics.CreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically assign request.user as the shop owner
        shop = serializer.save(owner=self.request.user)

        # Determine feature configuration based on selected business_type
        business_type = shop.business_type.lower().strip() if shop.business_type else ''

        feature_presets = {
            'service': {'inventory': False, 'sales': True, 'customers': True, 'reports': True},
            'consulting': {'inventory': False, 'sales': True, 'customers': True, 'reports': True},
            'freelance': {'inventory': False, 'sales': True, 'customers': True, 'reports': True},
            'kirana': {'inventory': True, 'sales': True, 'customers': True, 'reports': True},
            'retail': {'inventory': True, 'sales': True, 'customers': True, 'reports': True},
        }

        config = feature_presets.get(business_type, {
            'inventory': True,
            'sales': True,
            'customers': True,
            'reports': True,
        })

        # Initialize FeatureConfig for the created shop
        FeatureConfig.objects.get_or_create(shop=shop, defaults=config)
