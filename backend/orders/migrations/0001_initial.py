from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [migrations.CreateModel(
        name="BurgerOrder",
        fields=[
            ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
            ("customer", models.CharField(max_length=100, verbose_name="Имя клиента")),
            ("bun", models.CharField(max_length=50, verbose_name="Булочка")),
            ("meat", models.CharField(max_length=50, verbose_name="Мясо")),
            ("ingredients", models.JSONField(blank=True, default=list, verbose_name="Добавки")),
            ("quantity", models.PositiveSmallIntegerField(verbose_name="Количество")),
            ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Создан")),
        ],
    )]
