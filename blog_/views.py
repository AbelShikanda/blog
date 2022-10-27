from django.shortcuts import get_object_or_404, render
from .models import *

# Create your views here.

def blog_view (request):
    blogs =  Blog.objects.prefetch_related("blog_image").filter(is_active=True,)
    
    context = {
        'blogs' : blogs
        }   
    return render(request, 'blog.html', context);


def blog_single_view (request, slug):
    blog = get_object_or_404(Blog, slug=slug, is_active=True)
    
    context  = {
        'blog' : blog
        }  
    return render(request, 'blog_single.html', context);

def category_list(request, category_slug=None):
    b_categories = Blog.objects.all()
    b_category = get_object_or_404(Category, slug=category_slug)
    blogs = Blog.objects.filter(category=category)
    
    context  = {
        'b_categories' : b_categories,
        'b_category' : b_category,
        'blogs' : blogs,
        }  
    return render(request, 'blog_category.html', context);