from rest_framework import serializers

from main.models import UserProfile, Business, Individual, Location, Application
from django.contrib.auth import authenticate
from django.contrib.auth.models import auth
from django.core.validators import EmailValidator

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("address", "zip_code", "city")


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'email', 'first_name', 'last_name', 'username', 'location')


class BusinessUserSerializer(serializers.ModelSerializer):
    user_profile = UserSerializer(read_only=True)

    class Meta:
        model = Business
        fields = ("short_paragraph", "business_name", "user_profile", "social", "website")

# Register Serializer
class UserRegisterSerializer(serializers.ModelSerializer):
    address = serializers.CharField(max_length=1024,required=True)
    zip_code = serializers.CharField(max_length=12,required=True)
    city = serializers.CharField(max_length=1024,required=True)

    class Meta:
        model = UserProfile
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'validators': [EmailValidator,]},
            }

class IndividualRegisterSerializer(UserRegisterSerializer):
    class Meta(UserRegisterSerializer.Meta):
        fields = ('id', "username", "email", "first_name", "last_name", "industry", "password", "address", "zip_code", "city")

    def create(self, validated_data):
        user = UserProfile.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'])
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.industry = validated_data['industry']
        user.is_Individual = True
        user.username = validated_data['email']
        location = Location.objects.create(address=validated_data['address'],
                                           zip_code=validated_data['zip_code'],
                                           city=validated_data['city'])
        user.location = location
        user.save()
        individual = Individual.objects.create(user_profile=user)
        individual.save()
        return user

class BusinessRegisterSerializer(UserRegisterSerializer):
    business_name = serializers.CharField(max_length=80, required=True)
    short_paragraph = serializers.CharField(required=True)
    social = serializers.CharField(max_length=200)
    website = serializers.CharField(max_length=200)
    #image = serializers.ImageField(required=False) 

    class Meta(UserRegisterSerializer.Meta):
        fields = ('id', "username", "email", "first_name", "last_name", "industry", "password", "address", "zip_code",
                  "city", "short_paragraph", "business_name", "social", "website")#, "image")

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
        business.social = validated_data['social']
        business.website = validated_data['website']
       # business.image = validated_data['image']
        business.save()
        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = auth.authenticate(username=data['email'], password=data['password'])

        if user and user.is_active:
            if user.is_Business:
                business = Business.objects.get(user_profile=user)
                return user, business
            if user.is_Individual:
                individual = Individual.objects.get(user_profile=user)
                return user, individual

        raise serializers.ValidationError("Incorrect Credentials")


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
