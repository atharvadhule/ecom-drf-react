from django.conf import settings
from django.db import models
from products.models import Product

class Cart(models.Model):
   id = models.AutoField(primary_key=True)
   user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class CartItem(models.Model):
    id = models.AutoField(primary_key=True)
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE)
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField()
   