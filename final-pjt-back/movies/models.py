from django.db import models
from django.conf import settings

class Genre(models.Model):
    genre_id = models.IntegerField()
    genre_name = models.CharField(max_length=20)

class Movie(models.Model):
    movie_id = models.IntegerField()
    title = models.CharField(max_length=100)
    poster_path = models.CharField(max_length=300)
    overview = models.CharField(max_length=200)
    popularity = models.IntegerField()
    vote_average = models.FloatField()
    release_date = models.CharField(max_length=20)
    genre = models.ManyToManyField(Genre, related_name='movie_genre')
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, symmetrical=False, related_name='movie_likes')