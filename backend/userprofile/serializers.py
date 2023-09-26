from rest_framework import serializers
from .models import UserProfile,Product,ProductCategory
from account.serializers import UserSerializer
from account.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'logo_img_url', 'brand_name',"contact_no","footnote")  

class ProductSerializer(serializers.ModelSerializer):
    category_name= serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ('id','name','price','is_available', 'img_url','category_name','category')
    def get_category_name(self,obj):
        return obj.category.name

class ProductCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductCategory
        fields = ('id', 'name')

class UserDetailSerializer(serializers.ModelSerializer):
    profile=UserProfileSerializer()
    product_categories= ProductCategorySerializer()
    class Meta:
        model = User
        fields = ('id', 'profile','product_categories')  

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'logo_img_url','brand_name','contact_no','footnote')  





