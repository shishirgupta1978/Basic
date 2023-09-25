# urls.py in your app

from django.urls import path
from .views import UserProfileUpdateView,get_website,get_user_profile,get_product_categories,get_category_by_id,delete_category_by_id,save_category,update_category,get_products,delete_product_by_id,get_product_by_id,save_product,update_product

urlpatterns = [
    path('website/<int:id>/', get_website, name='get-website'),
    path('update/', UserProfileUpdateView.as_view(), name='update-user-profile'),
    path('get-user-profile/', get_user_profile, name='get-user-profile'),
 
    path('get-product-categories/', get_product_categories, name='get-product-categories'),
    path('category/<int:id>/', get_category_by_id, name='get-category-by-id'),
    path('deletecategory/<int:id>/', delete_category_by_id, name='delete-category-by-id'),
    path('category/', save_category, name='save-category'),
    path('updatecategory/<int:id>/', update_category, name='update-category'),
 
    path('getproducts/', get_products, name='get-products'),
    path('product/<int:id>/', get_product_by_id, name='get-product-by-id'),
    path('deleteproduct/<int:id>/', delete_product_by_id, name='delete-product-by-id'),
    path('product/', save_product, name='save-product'),
    path('updateproduct/<int:id>/', update_product, name='update-product'),
]
