from django.urls import path
from .views import CategoriesDetail, ListCart, ListCategories, ListCourses, CourseDetail, ListUser, LogoutApi
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('courses/', ListCourses.as_view(), name="list_courses"),
    path('courses/<int:pk>', CourseDetail.as_view(), name="detail_courses"),
    path('categories/', ListCategories.as_view(), name="list_categories"),
    path('categories/<int:pk>', CategoriesDetail.as_view(), name="detail_categories"),
    path('users/', ListUser.as_view(), name="list_users"),
    path('logout/', LogoutApi.as_view(), name="logout"),
    path('cart/', ListCart.as_view(), name="list_cart"),
]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)