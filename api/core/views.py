from typing import List
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import serializers, status
from django.http import JsonResponse
from .models import *
from .serializers import CourseSerliazer

# Create your views here.
class ListCourses(APIView):
    def get(self, request, *args, **kwargs):   
        courses = Course.objects.all()
        serializer = CourseSerliazer(courses, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CourseSerliazer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)