from django.db import models
from django.db.auth.models import User

# Create your models here.
class Base(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    class Meta:
        abstract = True

class Category(Base):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'categories'

class Payment(Base):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'payment'

class Course(Base):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    price = models.FloatField()
    description = models.TextField()
    image = models.ImageField(upload_to='media/')

    class Meta:
        db_table = 'course'

class Cart(Base):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, ondelete=models.CASCADE)

    class Meta:
        db_table = 'cart'

class CartCourses(Base):
    id = models.AutoField(primary_key=True)
    id_cart = models.ForeignKey(Cart, ondelete=models.CASCADE)
    id_courses = models.ForeignKey(Course, ondelete=models.CASCADE)

    class Meta:
        db_table = 'cart_courses'


class Order(Base):
    id = models.AutoField(primary_key=True)
    status = models.Boolean(default=False)

    class Meta:
        db_table = 'order'

        
class CartOrder(Base):
    id = models.AutoField(primary_key=True)
    id_order = models.ForeignKey(Order, ondelete=models.CASC)
    id_cart_courses = models.ForeignKey(CartOrder, ondelete=models.CASCADE)

    class Meta:
        db_table = 'cart_order'

