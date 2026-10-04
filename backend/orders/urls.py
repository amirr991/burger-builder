from django.urls import path
from .views import BurgerOrderCreateView

urlpatterns = [path("orders/", BurgerOrderCreateView.as_view(), name="create-order")]
