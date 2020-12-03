from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView
from ..serializers import *
from ..industries import Industries
from ..keywords import Keywords
from ..cities import Cities
from ..models import Location, Post, Business, Application, UserProfile, Individual
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

class RegisterIndividualAPI(generics.GenericAPIView):
    serializer_class = IndividualRegisterSerializer

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
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user_profile, user = serializer.validated_data
            _, token = AuthToken.objects.create(user_profile)
            if user_profile.is_Business:
                user_data = BusinessUserSerializer(user, context=self.get_serializer_context()).data
                user_data['user-type'] = 'business'
            else:
                user_data = UserSerializer(user_profile, context=self.get_serializer_context()).data
                user_data['user-type'] = 'individual'
            return Response({
            "user": user_data,
            "token": token
            })
        
        except:
            return Response({
            "error": "Invalid username password combination",
            })
        

# GetUser API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class OptionsView(APIView):
    def get(self, request):
        return Response({
            'cities' : Cities.get(),
            'industry' : list({industry[1] for industry in Industries.get()}),
            "keyword" : Keywords.get()
        })


class PostView(APIView):
    def post(self, request):
        print(request.data)
        username = request.data['business']
        try:
            user = UserProfile.objects.get(username=username)
            business = Business.objects.get(user_profile=user)
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
                link=request.data['link'],
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
                'link' : post.link,
                'description' : post.description,
                'requirements' : post.requirements,
                'notes' : post.notes,
                'company' : post.business.business_name,
                'website': post.business.website,
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
        username = self.request.query_params.get("username")
        if username:
            try:
                if "%40" in username:
                    username.replace("%40", "@")
                user = UserProfile.objects.get(username=username)
                user_info = {
                    'user-type': "business" if user.is_Business else "individual",
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'id': user.pk,
                    'email': user.email,
                    'address': str(user.location),
                }
                posts = Post.objects.all()
                if user.is_Business:
                    business = Business.objects.get(user_profile=user)
                    user_info['business_name'] = business.business_name
                    user_info['website'] = business.website
                    user_info['social'] = business.social
                    user_info['short_paragraph'] = business.short_paragraph
                    posts = posts.filter(business=business)

                    return Response({
                        "posts": [{'title':post.post_title, 'desc':post.small_description, 'id':post.pk} for post in posts], 
                        "userinfo": user_info
                    })
                else:
                    individual = Individual.objects.get(user_profile=user)
                    posts = individual.post_set.all()

                    return Response({ 
                        "posts": [{'title':post.post_title, 'desc':post.small_description, 'id':post.pk} for post in posts],
                        "userinfo": user_info
                    })
            except Exception as e:
                print(str(e))
                return Response({
                    'error' : "User not found..."
                })
        else:
            return Response({
                'error' : "Username not provided"
            })
    
    def post(self, request):
        username = self.request.data["username"]
        if username:
            try:
                user = UserProfile.objects.get(username=username)
                if user.is_Business:
                    business = Business.objects.get(user_profile=user)
                    if request.data['address']:
                        business.user_profile.location.address = request.data['address']
                    if request.data['postal_code']:
                        business.user_profile.location.zip_code = request.data['postal_code']
                    if request.data['city']:
                        business.user_profile.location.city = request.data['city']
                    if request.data['first_name']:
                        business.user_profile.first_name = request.data['first_name']
                    if request.data['last_name']:
                        business.user_profile.last_name = request.data['last_name']
                    if request.data['industry']:
                        business.user_profile.industry = request.data['industry']
                    business.user_profile.location.save()
                    business.user_profile.save()
                    if request.data['short_paragraph']:
                        business.short_paragraph = request.data['short_paragraph']
                    if request.data['website']:
                        business.website = request.data['website']
                    if request.data['social']:
                        business.social = request.data['social']
                    if request.data['business_name']:
                        business.business_name = request.data['business_name']
                    business.save()
                    return Response({"username": business.user_profile.username})
                elif user.is_Individual:
                    individual = Individual.objects.get(user_profile=user)
                    if request.data['address']:
                        individual.user_profile.location.address = request.data['address']
                    if request.data['postal_code']:
                        individual.user_profile.location.zip_code = request.data['postal_code']
                    if request.data['city']:
                        individual.user_profile.location.city = request.data['city']
                    if request.data['first_name']:
                        individual.user_profile.first_name = request.data['first_name']
                    if request.data['last_name']:
                        individual.user_profile.last_name = request.data['last_name']
                    if request.data['industry']:
                        individual.user_profile.industry = request.data['industry']
                    individual.user_profile.location.save()
                    individual.user_profile.save()
                    return Response({"username": individual.user_profile.username})
            except Exception:
                return Response({
                    'error': "Business could not be modified..."
                })
        else:
            return Response({
                'error' : "Username not provided"
            })

class SavePostView(APIView):
    def post(self, request):
        username = self.request.data["username"]
        post_id = self.request.data["post_id"]
        if username:
            try:
                user = UserProfile.objects.get(username=username)
                individual = Individual.objects.get(user_profile=user)
            except Exception:
                return Response({
                    'error': "User not found..."
                }, status=404)
            try:
                post = Post.objects.get(pk=post_id)
            except Exception:
                return Response({
                    'error': "Post not found..."
                }, status=404)

            post.individuals.add(individual)
            return Response({
                'success' : "success"
            })
        else:
            return Response({
                'error' : "Username not provided"
            }, status=404)


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
            try: 
                app = Application.objects.get(id=app_id)
            
                return Response({
                    'id' : app.id,
                    'q1' : app.q1,
                    'q2' : app.q2,
                    'q3' : app.q3,
                    'q4' : app.q4,
                    'q5' : app.q5
                })
            except Exception:
                return Response({
                'error' : "Application not found..."
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