from django.urls import path
from .views import ListCourses

urlpatterns = [
    path('courses/', ListCourses.as_view(), name="list_courses"),
]