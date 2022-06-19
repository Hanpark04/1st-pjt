from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.serializers import MovieSerializer

class ProfileSerializer(serializers.ModelSerializer):
    followers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    follower_count = serializers.IntegerField(source='followers.count', read_only=True)
    following_count = serializers.IntegerField(source='followings.count', read_only=True)
    movie_likes = MovieSerializer(many=True, read_only=True)
    class Meta:
        model = get_user_model()
        fields = ('pk', 'username', 'email', 'followers', 'follower_count', 'following_count', 'movie_likes',)