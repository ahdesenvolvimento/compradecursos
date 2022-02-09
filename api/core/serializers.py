from pyexpat import model
from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

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

class UserSerializer(serializers.ModelSerializer):
    def validate_password(self, value):
        return make_password(value)

    class Meta:
        model = User
        fields = '__all__'

class CartCourserSerializer(serializers.ModelSerializer):
    id_courses = CourseSerliazer()
    class Meta:
        model = CartCourses
        fields = ('id_cart', 'id_courses', )

        
class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad token')