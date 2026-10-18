from django.db import models
from accounts.models import User
from products.models import Product

class Order(models.Model):
   id = models.AutoField(primary_key=True)
   user = models.OneToOneField('accounts.User', on_delete=models.CASCADE)


class OrderItem(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)