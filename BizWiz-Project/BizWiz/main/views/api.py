from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView
from ..serializers import UserSerializer, BusinessRegisterSerializer, LoginSerializer, ApplicationSerializer
from ..industries import Industries
from ..models import Location, Post, Business, Application, UserProfile
import requests

# Register API
class RegisterBusinessAPI(generics.GenericAPIView):
    serializer_class = BusinessRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": token
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class OptionsView(APIView):
    def get(self, request):
        return Response({
            'cities' : list({location.city for location in Location.objects.all()}),
            'types' : list({industry[1] for industry in Industries.get()}),
        })


class PostView(APIView):
    def post(self, request):
        print(request.data)
        business_id = request.data['business']
        try:
            business = Business.objects.get(pk=business_id)
            location = Location.objects.create(
                address=request.data['address'],
                zip_code=request.data['zip_code'],
                city=request.data['city']
            )
            location.save()

            new_post = Post.objects.create(
                business=business,
                position=request.data['position'],
                post_title=request.data['post_title'],
                location=location,
                salary=request.data['salary'],
                deadline=request.data['deadline'],
                small_description=request.data['small_description'],
                description=request.data['description'],
                requirements=request.data['requirements'],
                notes=request.data['notes']
            )
            new_post.save()

            return Response({"id":new_post.pk})
        except Exception:
            return Response({
                'error' : "Post could not be created..."
            })

    def get(self, request):
        data_id = self.request.query_params.get("id")
        print(data_id)

        if data_id:
            post = Post.objects.get(pk=data_id)
        
            return Response({
                'position' : post.position,
                'title' : post.post_title,
                'location' : str(post.location), 
                'salary' : post.salary,
                'about' : post.business.short_paragraph, 
                'deadline' : post.deadline,
                'link' : "",
                'description' : post.description,
                'requirements' : post.requirements,
                'notes' : post.notes,
                'company' : post.business.business_name,
                'website': "",
            })
        else:
            return Response({
                'error' : "Post not found..."
            })


class PostingList(APIView):
    def post(self, request):
        data_city = request.data['city']
        data_keyword = request.data['keyword']
        data_type = request.data['type']
        for tup in Industries.get():
            if tup[1] == data_type:
                data_type = tup[0]
                break

        candidates = Post.objects.all()

        if data_city != "":
            candidates = lst.filter(business__user_profile__location__city=data_city)
        if data_type != "":
            candidates = lst.filter(business__user_profile__industry=data_type)
        if data_keyword != "":
            candidates = [candidate for candidate in candidates if data_keyword in candidate.post_title]

        resp = []
        for candidate in candidates:
            post = {}
            post['address'] = str(candidate.location)

            coordinates = requests.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + str(candidate.location) + "+CA&key=AIzaSyBTqSHfkmVBJ2A5TwE7szjjd4pTd9CCfVo").json()
            post['companyName'] = candidate.business.business_name
            post['description'] = candidate.small_description

            if coordinates["status"] == "OK":
                post['lat'] = coordinates["results"][0]["geometry"]["location"]["lat"]
                post['lng'] = coordinates["results"][0]["geometry"]["location"]["lng"]
            else:
                post['lat'] = None
                post['lng'] = None

            post['description'] = candidate.small_description
            post['hyperlink'] = ""
            post['id'] = candidate.pk
            resp.append(post)

        return Response(resp)


class ProfileView(APIView):
    def get(self, request):
        business_id = self.request.query_params.get("id")
        if business_id:
            try:
                business = Business.objects.get(pk=business_id)
                posts = Post.objects.all()
                posts = posts.filter(business=business)

                return Response({
                    "posts": [{'title':post.post_title, 'desc':post.description, 'id':post.pk} for post in posts], 
                    "userinfo": {
                        'first_name': business.user_profile.first_name,
                        'last_name': business.user_profile.last_name,
                        'id': business.pk,
                        'email': business.user_profile.email,
                        'phone': "",
                        'address': str(business.user_profile.location),
                        'website': business.website,
                    }
                })
            except Exception:
                return Response({
                    'error' : "User not found..."
                })
        else:
            return Response({
                'error' : "Id not provided"
            })
    
    def post(self, request):
        business_id = self.request.data["id"]
        if business_id:
            try:
                business = Business.objects.get(pk=business_id)
                business.user_profile.location.address = request.data['address']
                business.user_profile.location.zip_code = request.data['postal_code']
                business.user_profile.location.city = request.data['city']
                business.user_profile.first_name = request.data['first_name']
                business.user_profile.last_name = request.data['last_name']
                business.user_profile.email = request.data['email']
                business.user_profile.location.save()
                business.user_profile.save()
                business.website = request.data['website']
                business.save()
                return Response({"id": business.pk})

            except Exception:
                try:
                    location = Location.objects.create(
                        address=request.data['address'],
                        zip_code=request.data['postal_code'],
                        city=request.data['city']
                    )
                    location.save()
                    user = UserProfile.objects.create(
                        industry="IT",
                        is_Business=True,
                        first_name=request.data['first_name'],
                        last_name=request.data['last_name'],
                        location=location,
                        pk=business_id,
                        email=request.data['email']
                    )
                    user.save()
                    business = Business.objects.create(
                        user_profile=user,
                        business_name='temp',
                        website=request.data['website'],
                    )
                    business.save()
                    return Response({"id":business.pk})
                except Exception:
                    return Response({
                        'error' : "Business could not be modified..."
                    })
        else:
            return Response({
                'error' : "Id not provided"
            })

@api_view(['GET'])
def applicationList(request):
    apps = Application.objects.all()
    serializer = ApplicationSerializer(apps, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def applicationDetail(request, pk):
    app = Application.objects.get(id=pk)
    serializer = ApplicationSerializer(app, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def applicationCreate(request):
    serializer = ApplicationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        return Response('error: application not created')

    return Response(serializer.data)

@api_view(['POST'])
def applicationUpdate(request, pk):
    app = Application.objects.get(id=pk)
    serializer = ApplicationSerializer(instance=app, data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        return Response('error: application not created')

    return Response(serializer.data)

@api_view(['DELETE'])
def applicationDelete(request, pk):
    app = Application.objects.get(id=pk)
    app.delete()

    return Response('Application deleted successfully!')


class ApplicationView(APIView):    
    def get(self, request):
        app_id = self.request.query_params.get("id")
        print(app_id)

        if app_id:

            app = Application.objects.get(id=app_id)
        
            return Response({
                'id' : app.id,
                'q1' : app.q1,
                'q2' : app.q2,
                'q3' : app.q3,
                'q4' : app.q4,
                'q5' : app.q5
            })
        else:
            return Response({
                'error' : "Application not found..."
            })

    # this is not working yet
    def post(self, request):
        print(request.data)
        app_id = request.data['id']
        print("hello?")
        if app_id:
            try:
                app = Application.objects.get(id=app_id)
                app.q1 = request.data['q1']
                app.q2 = request.data['q2']
                app.q3 = request.data['q3']
                app.q4 = request.data['q4']
                app.q5 = request.data['q5']
                app.save()
                print("app.pk1-------")
                print(app.pk)
                return Response({'id': app.pk})

            except Exception:
                try:
                    new_app = Application.objects.create(
                        id=app_id,
                        q1=request.data['q1'],
                        q2=request.data['q2'],
                        q3=request.data['q3'],
                        q4=request.data['q4'],
                        q5=request.data['q5'],)
                    new_app.save()
                    print("app.pk2----------")
                    print(new_app.pk)
                    
                    return Response({'id':new_app.pk})

                except Exception:
                    print("error")
                    return Response({
                        'error' : "Application could not be created..."
                    })
        else:
            return Response({
                'error' : "Id not provided"
            })

    