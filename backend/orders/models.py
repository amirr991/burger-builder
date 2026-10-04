from django.db import models

class BurgerOrder(models.Model):
    customer = models.CharField("Имя клиента", max_length=100)
    bun = models.CharField("Булочка", max_length=50)
    meat = models.CharField("Мясо", max_length=50)
    ingredients = models.JSONField("Добавки", default=list, blank=True)
    quantity = models.PositiveSmallIntegerField("Количество")
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    def __str__(self):
        return f"{self.customer}: {self.bun} + {self.meat} × {self.quantity}"
