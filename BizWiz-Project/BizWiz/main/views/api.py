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


class PostingList(APIView):
    def post(self, request):
        data_city = request.data['city']
        data_keyword = request.data['keyword']
        data_type = request.data['type']

        candidates = lst = Post.objects.all()

        if data_city != "":
            candidates = lst.filter(business__user_profile__location__city=data_city)
        if data_type != "":
            candidates = lst.filter(business__user_profile__industry__name=data_type)
        if data_keyword != "":
            candidates = [candidate for candidate in candidates if data_keyword in candidate.post_title]

        resp = []
        for candidate in candidates:
            post = {}
            post['address'] = str(candidate.business.user_profile.location)
            post['companyName'] = candidate.business.business_name
            post['description'] = candidate.short_description
            post['hyperlink'] = ""
            post['id'] = candidate.pk
            resp.append(post)

        return Response(resp)

# {
#     position: "fulltime",
#     title: "engineer",
#     location: "123 street", 
#     salary: "99999",
#     about: "company info", business-short_paragraph
#     deadline: "tomorrow",
#     link: "www.apply.com",
#     description: "text",
#     requirements: "text",
#     notes: "text",
#     company: "company name", business-business_name
#     website: "www.company-website.com",
# }