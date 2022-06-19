from imp import SEARCH_ERROR
from re import S
from xmlrpc.client import FastMarshaller
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProfileSerializer

User = get_user_model()

@api_view(['GET'])
def profile(request, username):
    if request.user.is_authenticated:
        profile_user = get_object_or_404(get_user_model(), username=username)
        serializer = ProfileSerializer(profile_user)
        return Response(serializer.data)

@api_view(['POST'])
def follow(request, username):
    if request.user.is_authenticated:
        user = request.user
        profile_user = get_object_or_404(get_user_model(), username=username)
        if profile_user != user:
            if user.followings.filter(pk=profile_user.pk).exists():
                user.followings.remove(profile_user)
                context = {
                    'isFollow' : False
                }
            else:
                user.followings.add(profile_user)
                context = {
                    'isFollow' : True
                }
            return Response(context)

@api_view(['GET'])
def get_follow(request, username):
    user = request.user
    if request.user.is_authenticated:
        profile_user = get_object_or_404(get_user_model(), username=username)
        if profile_user != user:
            if user.followings.filter(pk=profile_user.pk).exists():
                isFollow = True
            else:
                isFollow = False
            context = {
                'isFollow': isFollow,
                'follower_count': profile_user.followers.count(),
                'following_count': profile_user.followings.count()
            }
            return Response(context)
    context = {
        'follower_count': user.followers.count(),
        'following_count': user.followings.count(),
    }
    return Response(context)