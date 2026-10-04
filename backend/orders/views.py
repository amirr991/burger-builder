from rest_framework import generics
from .models import BurgerOrder
from .serializers import BurgerOrderSerializer

class BurgerOrderCreateView(generics.CreateAPIView):
    queryset = BurgerOrder.objects.all()
    serializer_class = BurgerOrderSerializer
