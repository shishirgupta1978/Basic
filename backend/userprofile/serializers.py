from rest_framework import serializers
from .models import UserProfile,Product,ProductCategory
from account.serializers import UserSerializer
from account.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'user','website_url', 'logo_img_url', 'brand_name',"contact_no","footnote")  

class ProductSerializer(serializers.ModelSerializer):
    category_name= serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ('id','name','price','description','is_available', 'img_url','img_url2','img_url3','img_url4','category_name','discount','category')
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




