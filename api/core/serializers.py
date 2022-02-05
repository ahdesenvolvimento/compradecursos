from rest_framework import serializers
from .models import *

class CourseSerliazer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CategorySerliazer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PaymentSerliazer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'