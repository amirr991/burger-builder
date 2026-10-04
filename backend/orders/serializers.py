from rest_framework import serializers
from .models import BurgerOrder

class BurgerOrderSerializer(serializers.ModelSerializer):
    customer = serializers.CharField(max_length=100, allow_blank=False, trim_whitespace=True)
    bun = serializers.ChoiceField(choices=["Бриошь", "Кунжутная", "Цельнозерновая"])
    meat = serializers.ChoiceField(choices=["Говядина", "Курица", "Вегетарианская котлета"])
    ingredients = serializers.ListField(
        child=serializers.ChoiceField(choices=["Сыр", "Бекон", "Помидор", "Салат", "Лук", "Огурец"]),
        allow_empty=True,
    )
    quantity = serializers.IntegerField(min_value=1, max_value=20)

    class Meta:
        model = BurgerOrder
        fields = ["id", "customer", "bun", "meat", "ingredients", "quantity", "created_at"]
        read_only_fields = ["id", "created_at"]
