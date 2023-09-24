from django.shortcuts import render
from rest_framework import generics,status
from django.core.exceptions import ValidationError
from rest_framework.response import Response
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
