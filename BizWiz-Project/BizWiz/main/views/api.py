from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView
from ..serializers import UserSerializer, BusinessRegisterSerializer, LoginSerializer
from ..industries import Industries
from ..models import Location, Post, Business
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
        business_id = request.data['business']
        # try:
        business = Business.objects.get(pk=business_id)
        location = Location.objects.create(
            address=request.data['address'],
            zip_code=request.data['zip_code'],
            city=request.data['city']
        )

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

        return Response({"id":new_post.pk})
        # except Exception:
        #     print(str(Exception))
        #     return Response({
        #         'error' : "Post could not be created..."
        #     })

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
        user_id = self.request.query_params.get("id")

        if user_id:
            business = Business.objects.get(pk=user_id)
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
                    'website': "",
                }
        })
        else:
            return Response({
                'error' : "Post not found..."
            })

