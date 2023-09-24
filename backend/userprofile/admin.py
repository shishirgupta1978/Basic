from django.contrib import admin
from .models import Product,UserProfile,ProductCategory


admin.site.register(UserProfile)
admin.site.register(ProductCategory)
admin.site.register(Product)

# Register your models here.
