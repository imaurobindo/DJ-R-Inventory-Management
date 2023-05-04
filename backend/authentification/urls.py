from django.urls import path
from . import views
urlpatterns = [
     path('dashboard/', views.DashboardView.as_view(), name ='dashboard'),
     path('dashboard/pincodemain', views.PincodemainView.as_view(), name ='pincodemain'),
     path('logout/', views.LogoutView.as_view(), name ='logout')
]
