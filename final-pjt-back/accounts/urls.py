from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('profile/<str:username>/', views.profile, name='profile'),
    path('<str:username>/follow/', views.follow, name='follow'),
    path('<str:username>/getfollow/', views.get_follow, name='get_follow'),
]
