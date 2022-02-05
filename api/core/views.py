from typing import List
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import serializers, status
from django.http import Http404, JsonResponse
from .models import *
from .serializers import CartCourserSerializer, CategorySerliazer, CourseSerliazer, PaymentSerliazer, UserSerializer

class ListUser(APIView):
    def get(self, request, *args, **kwargs):   
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListCourses(APIView):
    def get(self, request, *args, **kwargs):   
        courses = Course.objects.all()
        serializer = CourseSerliazer(courses, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CourseSerliazer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDetail(APIView):
    def get_object(self, pk):
        try:
            return Course.objects.get(id=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def get(self, request, pk):
        course = self.get_object(pk)
        serializer = CourseSerliazer(course, many=True)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, pk):
        course = self.get_object(pk)
        serializer = CourseSerliazer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        course = self.get_object(pk)
        course.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)


class ListCategories(APIView):
    def get(self, request, *args, **kwargs):   
        categories = Category.objects.all()
        serializer = CategorySerliazer(categories, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CategorySerliazer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoriesDetail(APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(id=pk)
        except Category.DoesNotExist:
            raise Http404
    
    def get(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerliazer(category, many=True)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerliazer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = self.get_object(pk)
        category.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)


class ListPayment(APIView):
    def get(self, request, *args, **kwargs):   
        payments = Payment.objects.all()
        serializer = PaymentSerliazer(payments, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = PaymentSerliazer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentDetail(APIView):
    def get_object(self, pk):
        try:
            return Payment.objects.get(id=pk)
        except Payment.DoesNotExist:
            raise Http404
    
    def get(self, request, pk):
        payments = self.get_object(pk)
        serializer = PaymentSerliazer(payments, many=True)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, pk):
        payments = self.get_object(pk)
        serializer = PaymentSerliazer(payments, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        payments = self.get_object(pk)
        payments.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)


class ListCart(APIView):
    def get(self, request, *args, **kwargs):   
        items = CartCourses.objects.filter(id_cart__user=request.user)
        serializer = CartCourserSerializer(items, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        id_cart = Cart.objects.get(user=request.user)
        serializer = CartCourserSerializer(data={'id_course':request.data['id_course'], 'id_cart':id_cart})
        # CartCourses.objects.create(id_cart=id_cart, id_courses=request.data['id_course'])
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)