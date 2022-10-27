from django.urls import path
from . import views

app_name = 'blog_'

urlpatterns = [
    path('', views.blog_view, name='blog_view'),
    path('category/<slug:category_slug>/', views.category_list, name='category_list'),
    path('blog_single/<slug:slug>/', views.blog_single_view, name='blog_single_view'),
]
