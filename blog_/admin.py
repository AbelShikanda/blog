from django.contrib import admin
from . models import *

# Register your models here.


class BlogImageInline(admin.TabularInline):
    model = BlogImage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    prepopulated_fields = {
                            "slug" : ("name",),}

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active']
    list_filter = ['is_active']
    list_editable = ['is_active']
    prepopulated_fields = {
                            "slug" : ("title",),}
    inlines = [BlogImageInline,]