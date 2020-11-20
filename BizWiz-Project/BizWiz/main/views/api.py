from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView
from ..serializers import UserSerializer, BusinessRegisterSerializer, LoginSerializer
from ..models import Location, Industry, Post

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
            'types' : list({industry.name for industry in Industry.objects.all()}),
        })


class PostView(APIView):
    def get(self, request):
        data_id = request.data['id']

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

        candidates = Post.objects.all()

        if data_city != "":
            candidates = lst.filter(business__user_profile__location__city=data_city)
        if data_type != "":
            candidates = lst.filter(business__user_profile__industry__name=data_type)
        if data_keyword != "":
            candidates = [candidate for candidate in candidates if data_keyword in candidate.post_title]

        resp = []
        for candidate in candidates:
            post = {}
            post['address'] = str(candidate.location)
            post['companyName'] = candidate.business.business_name
            post['description'] = candidate.small_description
            post['lat'] = 0.0
            post['lng'] = 0.0
            post['description'] = candidate.small_description
            post['hyperlink'] = ""
            post['id'] = candidate.pk
            resp.append(post)

        return Response(resp)

