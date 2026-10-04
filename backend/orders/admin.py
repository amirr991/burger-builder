from django.contrib import admin
from .models import BurgerOrder

@admin.register(BurgerOrder)
class BurgerOrderAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "bun", "meat", "quantity", "created_at")
    list_filter = ("bun", "meat", "created_at")
