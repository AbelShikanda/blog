from email.policy import default
from django.db import models
from django.urls import reverse
from django_resized import ResizedImageField

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    is_active = models.BooleanField()
    
    class meta:
        verbose_name_plural = "Categories"
    
    def get_absolute_url(self):
        return reverse('blog:category_list', args=[self.slug])

    def __str__(self):
        return self.name

class Blog(models.Model):
    is_active = models.BooleanField()
    title = models.CharField(max_length=100)
    intro = models.TextField()
    body = models.TextField()
    quote = models.CharField(max_length=200)
    slug = models.SlugField(max_length=100, unique=True)
    created_at = models.DateField(auto_now_add=True, editable=False)
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category")
    
    class Meta:
        verbose_name_plural = "Blogs"
        ordering = ('-created_at',)

    
    def get_absolute_url(self):
        return reverse('blog:blog_single_view', args=[self.slug])
    
    def __str__(self):
        return self.title

class BlogImage(models.Model):
    image = ResizedImageField(size=[1920, 900], crop=['middle', 'center'], default ='default_img', upload_to='bloglarge')
    alt_text = models.CharField(max_length=100)
    is_active = models.BooleanField()
    
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="blog_image")