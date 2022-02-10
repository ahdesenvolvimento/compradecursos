from django.urls import path
from .views import CartDetail, CategoriesDetail, ListCart, ListCategories, ListCourses, CourseDetail, ListOrder, ListUser, LogoutApi, get_order_owner, index
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('', index, name='index'),
    path('courses/', ListCourses.as_view(), name="list_courses"),
    path('courses/<int:pk>', CourseDetail.as_view(), name="detail_courses"),
    path('categories/', ListCategories.as_view(), name="list_categories"),
    path('categories/<int:pk>', CategoriesDetail.as_view(), name="detail_categories"),
    path('users/', ListUser.as_view(), name="list_users"),
    path('logout/', LogoutApi.as_view(), name="logout"),
    path('cart/', ListCart.as_view(), name="list_cart"),
    path('cart/<int:pk>', CartDetail.as_view(), name='detail_cart'),
    path('order/', ListOrder.as_view(), name='list_order'),
    path('order-user/', get_order_owner, name='get_orders_owner'),
]

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)