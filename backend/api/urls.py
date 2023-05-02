
from django.urls import path
from .views import ProductsView, AuthUserView, SellersView, WarehousesView, CategoryView, SubCategoryView, SubSubCategoryView, SellerAddressView
from api import views

urlpatterns = [
    path('api/', ProductsView.as_view()),
    # path('',views.index2, name="home"),
    # path('login',views.loginUser , name="login"),
    # path('logout',views.logoutUser, name="logout")
    path('registerapi/', AuthUserView.as_view()),
    path('sellerapi/', SellersView.as_view()),
    path('warehouseapi/', WarehousesView.as_view()),
    path('categoryapi/', CategoryView.as_view()),
    path('subcategoryapi/', SubCategoryView.as_view()),
    path('subsubcategoryapi/', SubSubCategoryView.as_view()),
    path('selleraddressapi/', SellerAddressView.as_view()),
]
