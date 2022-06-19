from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('<int:movie_id>/', views.article_list, name='article_list'),
    path('<int:movie_id>/create/', views.article_create, name='article_create'),
    path('<int:article_id>/update/', views.article_update, name='article_update'),
    path('<int:article_id>/delete/', views.article_delete, name='article_delete'),
    path('<int:article_id>/commentcreate/', views.comment_create, name='comment_create'),
    path('<int:comment_id>/commentdelete/', views.comment_delete, name='comment_delete'),
    path('<int:article_id>/detail/', views.article_detail, name='article_detail'),
]