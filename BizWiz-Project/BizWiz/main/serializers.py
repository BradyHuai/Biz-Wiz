from rest_framework import serializers
from main.models import UserProfile, Business, Individual, Location
from django.contrib.auth import authenticate
from django.core.validators import EmailValidator

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserProfile
    fields = ('id', 'email', 'first_name', 'last_name', 'username')

# Register Serializer
class UserRegisterSerializer(serializers.ModelSerializer):
    address = serializers.CharField(max_length=1024,required=True)
    zip_code = serializers.CharField(max_length=12,required=True)
    city = serializers.CharField(max_length=1024,required=True)

    class Meta:
        model = UserProfile
        extra_kwargs = {'password': {'write_only': True}}

class BusinessRegisterSerializer(UserRegisterSerializer):
    business_name = serializers.CharField(max_length=80, required=True)
    short_paragraph = serializers.CharField(required=True)
    #image = serializers.ImageField(required=False) 

    class Meta(UserRegisterSerializer.Meta):
        fields = ('id', "username", "email", "first_name", "last_name", "industry", "password", "address", "zip_code", "city", "short_paragraph", "business_name")#, "image")
        extra_kwargs = {
            'email': {'validators': [EmailValidator,]},
        }

    def create(self, validated_data):            
        user = UserProfile.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'])
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.industry = validated_data['industry']
        user.is_Business = True
        user.username = validated_data['email']
        location = Location.objects.create(address=validated_data['address'],
                                           zip_code=validated_data['zip_code'],
                                           city=validated_data['city'])
        user.location = location
        user.save()
        business = Business.objects.create(user_profile=user)
        business.business_name = validated_data['business_name']
        business.short_paragraph = validated_data['short_paragraph']
       # business.image = validated_data['image']
        business.save()
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")