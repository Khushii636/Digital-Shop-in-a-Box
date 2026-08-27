from rest_framework import serializers
from .models import Shop, FeatureConfig


class FeatureConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureConfig
        fields = ('inventory', 'sales', 'customers', 'reports')


class ShopSerializer(serializers.ModelSerializer):
    feature_config = FeatureConfigSerializer(read_only=True)
    owner = serializers.ReadOnlyField(source='owner.email')

    class Meta:
        model = Shop
        fields = (
            'id',
            'shop_id',
            'name',
            'business_type',
            'owner',
            'feature_config',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'shop_id', 'owner', 'feature_config', 'created_at', 'updated_at')
