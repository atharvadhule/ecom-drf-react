from django.db import models
from accounts.models import User
from products.models import Product

class Cart(models.Model):
   id = models.AutoField(primary_key=True)
   user = models.OneToOneField('accounts.User', on_delete=models.CASCADE)


class CartItem(models.Model):
    id = models.AutoField(primary_key=True)
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE)
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField()
   