
from django.urls import path
from .views import ProductsView, AuthUserView
from api import views

urlpatterns = [
    path('api/', ProductsView.as_view()),
    # path('',views.index2, name="home"),
    # path('login',views.loginUser , name="login"),
    # path('logout',views.logoutUser, name="logout")
    path('registerapi/', AuthUserView.as_view()),
]
