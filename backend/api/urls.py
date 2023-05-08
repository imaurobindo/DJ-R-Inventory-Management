
from django.urls import path
from .views import ProductsView, AuthUserView, CategoryDeleteView, SubCategoryDeleteView, SubSubCategoryDeleteView, AuthUserPutView, WarehouseAddressView, SellersView, WarehousesView, CategoryView, SubCategoryView, SubSubCategoryView, SellerAddressView, current_user, MyUserView, SellerMobileView
from api import views

urlpatterns = [
    path('api/', ProductsView.as_view()),
    # path('',views.index2, name="home"),
    # path('login',views.loginUser , name="login"),
    # path('logout',views.logoutUser, name="logout")
    path('registerapi/', AuthUserView.as_view()),
    path('staffupdateapi/<str:username>/', AuthUserPutView.as_view()),
    path('sellerapi/', SellersView.as_view()),
    path('warehouseapi/', WarehousesView.as_view()),
    path('categoryapi/', CategoryView.as_view()),
    path('categorydeleteapi/<int:id>/', CategoryDeleteView.as_view()),
    path('subcategorydeleteapi/<int:id>/', SubCategoryDeleteView.as_view()),
    path('subsubcategorydeleteapi/<int:id>/', SubSubCategoryDeleteView.as_view()),
    path('subcategoryapi/', SubCategoryView.as_view()),
    path('subsubcategoryapi/', SubSubCategoryView.as_view()),
    path('selleraddressapi/', SellerAddressView.as_view()),
    path('warehouseaddressapi/', WarehouseAddressView.as_view()),
    path('current_user/', current_user),
    path('registermyuserapi/', MyUserView.as_view()),
    path('sellermobileapi/', SellerMobileView.as_view()),

]
