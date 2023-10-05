
import uuid
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from account.models import User
from django.template.defaultfilters import slugify




class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name="profile")
    website_url = models.SlugField(unique=True,blank=True, null=True)
    logo_img_url = models.CharField(verbose_name=_("Logo Url"), max_length=255,blank=True,null=True)
    brand_name = models.CharField(verbose_name=_("Brand Name"), max_length=50,blank=True,null=True)
    contact = models.TextField(verbose_name=_("contact"),blank=True,null=True)
    about = models.TextField(verbose_name=_("About"),blank=True,null=True)
    footnote=models.CharField(verbose_name=_("footnote"), max_length=100,blank=True,null=True)
    def __str__(self):
        return self.user.username+"'s profile"
    def save(self, *args, **kwargs):
        # If the slug is not set or is None, generate a slug from the title
        if not self.website_url:
            if self.brand_name:
                self.website_url = slugify(self.brand_name)

                # Check if the generated slug already exists, and append a unique identifier if needed
                base_slug = self.website_url
                counter = 1
                while UserProfile.objects.filter(website_url=self.website_url).exclude(pk=self.pk).exists():
                    self.website_url = f"{base_slug}-{counter}"
                    counter += 1
        super().save(*args, **kwargs)
    

    


class ImageUpload(models.Model):
    img= models.ImageField(upload_to='images/')
    def __str__(self):
        return self.img.url

class ProductCategory(models.Model):
    name= models.CharField(verbose_name=_("Category Name"), max_length=25,blank=True,null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="product_categories")
    def __str__(self):
        return self.name

class Product(models.Model):
    category=models.ForeignKey(ProductCategory,on_delete=models.CASCADE,related_name="products")
    name= models.CharField(verbose_name=_("Product Name"), max_length=255)
    img_url=models.CharField(verbose_name=_("Product Image Url"), max_length=255)
    img_url2=models.CharField(verbose_name=_("Product Image Url2"), max_length=255,blank=True,null=True,default='')
    img_url3=models.CharField(verbose_name=_("Product Image Url3"), max_length=255,blank=True,null=True,default='')
    img_url4=models.CharField(verbose_name=_("Product Image Url4"), max_length=255,blank=True,null=True,default='')
    description=models.TextField(verbose_name=_("Product Description"), blank=True,null=True,default='')
    price= models.PositiveIntegerField(verbose_name=_("Price"))
    discount=models.PositiveIntegerField(verbose_name=_("Discount"),default=0)
    is_available=models.BooleanField(default=True)
    def __str__(self):
        return self.name