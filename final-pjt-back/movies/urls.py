from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('', views.main, name='main'),
    path('get/', views.get_movie, name="get_movie"),
    path('<int:movie_id>/like/', views.like, name="like"),
    path('<int:movie_id>/getlike/', views.get_like, name="get_like"),
    path('<int:movie_id>/onlygetlike/', views.only_get_like, name="only_get_like"),
    path('recommend/', views.recommend, name="recommend"),
    path('search/', views.search, name="search"),
]