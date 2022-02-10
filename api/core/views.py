from typing import List
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import serializers, status
from django.http import Http404, JsonResponse
from .models import *
from .serializers import CartCourserSerializer, CategorySerliazer, CourseSerliazer, LogoutSerializer, OrderSerializer, UserSerializer

@permission_classes([IsAuthenticated])
@api_view(['POST', 'GET'])
def index(request):
    if request.method == 'POST':
        if 'search' in request.data:
            courses = Course.objects.filter(name__contains=request.data['search']).order_by('-created')
            serializer = CourseSerliazer(courses, many=True)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    return JsonResponse({}, safe=False, status=status.HTTP_200_OK)

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
        courses = Course.objects.all().order_by('-created')
        serializer = CourseSerliazer(courses, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        serializer = CourseSerliazer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({}, status=status.HTTP_201_CREATED, safe=False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDetail(APIView):
    def get_object(self, pk):
        try:
            return Course.objects.get(id=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def get(self, request, pk):
        course = self.get_object(pk)
        serializer = CourseSerliazer(course)
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
        serializer = CategorySerliazer(category)
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


class LogoutApi(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ListCart(APIView):
    def get(self, request, *args, **kwargs):   
        cart = Cart.objects.filter(user=request.user)
        if not cart:
            Cart.objects.create(user=request.user)
        items = CartCourses.objects.filter(id_cart__user=request.user).filter(status=False)
        serializer = CartCourserSerializer(items, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        cart = Cart.objects.filter(user=request.user)
        if not cart:
            Cart.objects.create(user=request.user)
        id_cart = Cart.objects.get(user=request.user)
        CartCourses.objects.create(
            id_courses=Course.objects.get(id=request.data['id_course']),
            id_cart=id_cart
        )
        return JsonResponse({}, status=status.HTTP_201_CREATED)


class CartDetail(APIView):
    def get_object(self, pk):
        try:
            return CartCourses.objects.get(id=pk)
        except CartCourses.DoesNotExist:
            raise Http404
    def delete(self, request, pk):
        cart = self.get_object(pk)
        cart.delete()
        items = CartCourses.objects.filter(id_cart__user=request.user).filter(status=False)
        serializer = CartCourserSerializer(items, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


class ListOrder(APIView):
    def get(self, request, *args, **kwargs):
        items = CartCourses.objects.filter(id_cart__user=request.user).filter(status=False)
        
        serializer = CartCourserSerializer(items, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        items = CartCourses.objects.filter(id_cart__user=request.user, status=False)
        order = Order.objects.create(
            status=True,
            user=request.user
        )
        items_order = [(CartOrder.objects.create(id_order=order, id_cart_courses=CartCourses.objects.get(id_cart__user=request.user, status=False, id=item.id)), CartCourses.objects.filter(id=item.id).filter(status=False).update(status=True)) for item in items]
        return JsonResponse({}, status=status.HTTP_201_CREATED)

@permission_classes([IsAuthenticated])
@api_view(['POST', 'GET'])
def get_order_owner(request):
    order = Order.objects.filter(user=request.user)   
    serializer_order = OrderSerializer(order, many=True)
    items = CartCourses.objects.filter(id_cart__user=request.user).filter(status=False)
        
    serializer = CartCourserSerializer(items, many=True)
    dicionario = {
        'order':serializer_order.data,
        'items':serializer.data
    }
    return JsonResponse(dicionario, safe=False, status=status.HTTP_200_OK)