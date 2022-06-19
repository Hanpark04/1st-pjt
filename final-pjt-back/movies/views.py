from re import L
from django.shortcuts import render, redirect, get_object_or_404
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Movie, Genre
from .serializers import MovieSerializer
import random
import requests

# Create your views here.

@api_view(['GET'])
def main(request):
    movies = Movie.objects.order_by('-popularity')
    serializers = MovieSerializer(movies, many=True)
    return Response(serializers.data)

def data_encode(str):
    return str.replace('\u200b', ' ').replace('\u2013', ' ').replace('\xa0', ' ').strip()

def get_movie(request):
    genre_url = "https://api.themoviedb.org/3/genre/movie/list?api_key=4e24eca06c0cc10fa84d2d35f7551703&language=ko-KR"
    genres = requests.get(genre_url).json()
    genres = genres.get("genres")
    for genre in genres:
        if Genre.objects.filter(genre_id = genre.get('id')).exists():
            pass
        else:
            genre_data = Genre.objects.create(
                genre_id = genre.get('id'),
                genre_name = data_encode(genre.get('name')),
            )
    movie_url = "https://api.themoviedb.org/3/movie/popular?api_key=4e24eca06c0cc10fa84d2d35f7551703&&language=ko-KR&&region=KR&page="
    for i in range(1, 51):
        movies = requests.get(movie_url + str(i)).json()
        movies = movies.get("results")
        for movie in movies:
            if Movie.objects.filter(movie_id = movie.get('id')).exists():
                continue
            if movie.get('overview'):
                overview = data_encode(movie.get('overview'))
            else:
                overview = '줄거리 정보 없음.'
            if movie.get('poster_path'):
                poster_path = 'https://image.tmdb.org/t/p/w500' + movie.get('poster_path')
            else:
                poster_path = '포스터 정보 없음.'
            movie_data = Movie.objects.create(
                movie_id = movie.get('id'),
                title = data_encode(movie.get('title')),
                poster_path = poster_path,
                overview = overview,
                popularity = movie.get('popularity')*1000000,
                vote_average = movie.get('vote_average'),
                release_date = movie.get('release_date'),
            )
            for g_id in movie.get('genre_ids'):
                g_data = Genre.objects.get(genre_id = g_id)
                movie_data.genre.add(g_data)
    return redirect('movies:main')

@api_view(['POST'])
def like(request, movie_id):
    if request.user.is_authenticated:
        movie = get_object_or_404(Movie, movie_id=movie_id)
        user = request.user
        if movie.like_users.filter(id=user.pk).exists():
            movie.like_users.remove(user)
            is_like = False
        else:
            movie.like_users.add(user)
            is_like = True
        context = {
            'is_like': is_like,
            'likes_count': movie.like_users.count()
        }
        return Response(context)

@api_view(['GET'])
def get_like(request, movie_id):
    if request.user.is_authenticated:
        movie = get_object_or_404(Movie, movie_id=movie_id)
        user = request.user
        if movie.like_users.filter(id=user.pk).exists():
            is_like = True
        else:
            is_like = False
        context = {
            'is_like': is_like,
            'likes_count': movie.like_users.count()
        }
        return Response(context)
        
@api_view(['GET'])
def only_get_like(request, movie_id):
    movie = get_object_or_404(Movie, movie_id=movie_id)
    context = {
        'likes_count': movie.like_users.count()
    }
    return Response(context)
    

@api_view(['GET'])
def recommend(request):
    if request.user.is_authenticated:
        user = request.user
        movie_ids = list(user.movie_likes.all().values('id'))
        genres_count = [[0, 0] for _ in range(19)]
        for n in range(len(genres_count)):
            genres_count[n][1] = n+1
        for i in range(len(movie_ids)):
            genre_ids = list(Genre.objects.filter(movie_genre=movie_ids[i]['id']).values('id'))
            for j in range(len(genre_ids)):
                genres_count[genre_ids[j]['id']-1][0] += 1
        genres_count.sort(reverse=True)
        recommend_movie = Movie.objects.none()
        for k in range(3):
            select_genre = genres_count[k][1]
            select_movie = list(Movie.objects.filter(genre=select_genre).values('id'))
            num = len(select_movie)
            for l in range(4):
                random_num = random.randrange(0, num)
                new_movie = Movie.objects.filter(pk=select_movie[random_num]['id'])
                select_movie.pop(random_num)
                num -= 1
                recommend_movie = recommend_movie.union(new_movie)
        serializers = MovieSerializer(recommend_movie, many=True)
        return Response(serializers.data)

@api_view(['POST'])
def search(request):
    all_movies = Movie.objects.all()
    search_result = request.data['search_word']
    if search_result:
        search_movies = all_movies.filter(title__icontains=search_result)
        if search_movies.exists():   
            serializers = MovieSerializer(search_movies, many=True)
            return Response(serializers.data)
    context = {}
    return Response(context)