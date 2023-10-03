from django.shortcuts import render
from rest_framework import generics,status
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import UserProfile,ProductCategory,Product
from account.models import User
from .serializers import UserProfileSerializer,UserDetailSerializer,ProductCategorySerializer,ProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes

class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

@api_view(['GET'])
def get_website(request,id):
    try:
        users=User.objects.filter(id=id)
        if (users.count()>0):
            serializer=UserDetailSerializer(users[0])
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"found":False}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    try:
        users=UserProfile.objects.filter(user=request.user)
        if (users.count()>0):
            serializer=UserProfileSerializer(users[0])
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"found":False}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_product_categories(request):
    try:
        product_categories=ProductCategory.objects.filter(user=request.user)
        serializer=ProductCategorySerializer(product_categories,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_category_by_id(request,id):
    try:
        product_categories=ProductCategory.objects.filter(user=request.user,id=id)
        if product_categories.count()>0:
            serializer=ProductCategorySerializer(product_categories[0])
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Record Not Found"}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_category_by_id(request,id):
    try:
        product_categories=ProductCategory.objects.filter(user=request.user,id=id)
        if product_categories.count()>0:
            product_categories.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({"error": "Record Not Found"}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_category(request):
    try:
        objs=ProductCategory.objects.filter(name=request.data.get("name"),user=request.user)
        if objs.count() == 0:
            ProductCategory.objects.create(name=request.data.get("name"),user=request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Already exist"}, status=status.HTTP_400_BAD_REQUEST)


    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_category(request,id):
    try:
        product_categories=ProductCategory.objects.filter(user=request.user,id=id)
        if product_categories.count()>0 and request.data.get("name"):
            product_category =product_categories[0]
            product_category.name=request.data.get("name")
            if ProductCategory.objects.filter(user=request.user,id=id,name=request.data.get("name")).count() ==0:

                product_category.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response({'error':"Record with same name already exists."},status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_products(request):
    try:
        products=Product.objects.filter(category__in=ProductCategory.objects.filter(user=request.user))
        serializer=ProductSerializer(products,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_product_by_id(request,id):
    try:
        products=Product.objects.filter(category__in=ProductCategory.objects.filter(user=request.user)).filter(id=id)
        if products.count()>0:
            serializer=ProductSerializer(products[0])
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Record Not Found"}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)






@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product_by_id(request,id):
    try:
        products=Product.objects.filter(category__in=ProductCategory.objects.filter(user=request.user)).filter(id=id)
        if products.count()>0:
            products[0].delete()
            return Response(status=status.HTTP_200_OK)
        return Response({"error": "Record Not Found"}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_product(request):
    try:
        is_available=True
        if request.data.get("is_available")=="false":
            is_available=False
            



        categories=ProductCategory.objects.filter(user=request.user,id=request.data.get("category"))
        if categories.count() > 0:
            if (Product.objects.filter(name=request.data.get("name"),category=categories[0]).count() == 0):
               Product.objects.create(description=request.data.get("description"),name=request.data.get("name"),img_url=request.data.get("img_url"),img_url2=request.data.get("img_url2"),img_url3=request.data.get("img_url3"),img_url4=request.data.get("img_url4"),discount=request.data.get("discount"),price=request.data.get("price"),is_available=is_available,category=categories[0])
               return Response(status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Product already exists."}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"error": "Category does not exists."}, status=status.HTTP_400_BAD_REQUEST)

    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request,id):
    try:
        is_available=True
        if request.data.get("is_available")=="false":
            is_available=False

        categories=ProductCategory.objects.filter(user=request.user,id=int(request.data.get("category")))
        if categories.count()>0:
            category =categories[0]
            products=Product.objects.filter(category=category,id=id)
            if products.count()>0:
                product=products[0]
                product.name=request.data.get("name")
                product.discount=request.data.get("discount")
                product.price=request.data.get("price")
                product.img_url=request.data.get("img_url")
                product.img_url2=request.data.get("img_url2")
                product.img_url3=request.data.get("img_url3")
                product.img_url4=request.data.get("img_url4")
                product.description=request.data.get("description")
                product.is_available=is_available
                if Product.objects.filter(description=request.data.get("description"),img_url=request.data.get("img_url"),img_url2=request.data.get("img_url2"),img_url3=request.data.get("img_url3"),img_url4=request.data.get("img_url4"), name=request.data.get("name"), discount=request.data.get("discount"),price=request.data.get("price"), category=category).count() ==0:
                    product.save()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response({'error':"Record with same name already exists."},status=status.HTTP_400_BAD_REQUEST)
            else:
                    return Response({'error':"Product does not exists."},status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_profile(request,id):
    try:
        users=User.objects.filter(pkid=id)
        if (users.count()>0):
            profiles=UserProfile.objects.filter(user=users[0])
            categories=ProductCategory.objects.filter(user=users[0])
            if (profiles.count()>0):
                serializer=UserProfileSerializer(profiles[0])
                ss=ProductCategorySerializer(categories,many=True)
                return Response({'profile':serializer.data,'categories':ss.data}, status=status.HTTP_200_OK)
            else:
                return Response({"found":False}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"found":False}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_products_by_catid(request,id,uid):
    try:
        users=User.objects.filter(pkid=uid)
        if users.count()>0:
            if id!=0:
                products=Product.objects.filter(category__in=ProductCategory.objects.filter(user=users[0],id=id))
            else:
                products=Product.objects.filter(category__in=ProductCategory.objects.filter(user=users[0]))
        else:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

        serializer=ProductSerializer(products,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_cart_data(request):
    try:
        objs=Product.objects.filter(id__in=[id for id in request.data.keys()])
        serializers= ProductSerializer(objs,many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
 
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_website_list(request):
    try:
        objs=UserProfile.objects.exclude(website_url__isnull=True)
        serializers= UserProfileSerializer(objs,many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
 
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_website_by_slug(request,slug):
    obj=get_object_or_404(UserProfile,website_url=slug)
    serializers= UserProfileSerializer(obj)
    return Response(serializers.data, status=status.HTTP_200_OK)

