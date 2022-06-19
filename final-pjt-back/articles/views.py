from .models import Article, Comment
from .serializers import ArticleSerializer, CommentSerializer

from django.shortcuts import render, get_object_or_404
from django.apps import apps
from django.contrib.auth import get_user_model
from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def article_list(request, movie_id):
    Movie = apps.get_model('movies', 'Movie')
    movie = get_object_or_404(Movie, movie_id=movie_id)
    articles = movie.articles.all().order_by('updated_at')
    serializers = ArticleSerializer(articles, many=True)
    articles = serializers.data
    article_all = []
    for article in articles:
        article_data = {
            'id': article['id'],
            'title': article['title'],
            'content': article['content'],
            'created_at': article['created_at'],
            'updated_at': article['updated_at'],
            'movie_id': movie.movie_id,
            'user_id': article['user'],
            'username': get_user_model().objects.filter(pk=article['user']).values('username'),
        }
        article_all.append(article_data)
    return Response(article_all)

@api_view(['POST'])
def article_create(request, movie_id):
    Movie = apps.get_model('movies', 'Movie')
    movie = get_object_or_404(Movie, movie_id=movie_id)
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def article_update(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    Movie = apps.get_model('movies', 'Movie')
    movie = get_object_or_404(Movie , movie_id=request.data['movie_id'])
    if request.user == article.user:
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@api_view(['DELETE'])
def article_delete(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    # Movie = apps.get_model('movies', 'Movie')
    # movie = get_object_or_404(Movie , movie_id=request.data['movie_id'])
    if request.user == article.user:
        article.delete()
        return Response({'id': article_id}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def comment_create(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user, article=article)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def comment_delete(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    if request.user == comment.user:
        comment.delete()
        return Response({'id': comment_id}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def article_detail(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    comments = article.comments.all().order_by('created_at')
    comment_list = []
    for comment in comments:
        comment_data = {
            'id': comment.id,
            'content': comment.content,
            'created_at': comment.created_at,
            'updated_at': comment.updated_at,
            'user_id': comment.user.id,
            'article_id': comment.article.id,
            'username': get_user_model().objects.filter(pk=comment.user.id).values('username'),
        }
        comment_list.append(comment_data)
    article_data = {
        'comment_list': comment_list
    }
    return Response(article_data)