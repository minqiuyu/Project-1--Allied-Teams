from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.generic import (
    ListView, DetailView, CreateView, UpdateView, DeleteView
    )
from .models import Post

def homepage(request):
    context = {
        'posts': Post.objects.all()
    }
    return render(request, 'homepage/home.html', context)

class PostListView(ListView):
    model = Post
    template_name = 'homepage/home.html'
    context_object_name = 'posts'
    ordering = ['-date_posted']

class UserPostListView(ListView):
    model = Post
    template_name = 'homepage/user_posts.html'
    #template_name = 'homepage/board.html'
    context_object_name = 'posts'
    #ordering = ['-date_posted']

    def get_queryset(self):
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        return Post.objects.filter(author=user).order_by('-date_posted')

class PostDetailView(DetailView):
    model = Post

class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ['title', 'content', 'location', 'department', 'function']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
    
class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content', 'location', 'department', 'function', 'new', 'active', 'hired' ]

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
    
    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False

class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = '/'

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False

def JobFilter(request):
    if request.method=="POST":
        location=request.POST.get('location')
        department=request.POST.get('department')
        function=request.POST.get('function')
        optionsA=Post.objects.raw('select * from homepage where location="'+location+'" and department="'+department+'" and function="'+function+'"')
        return render(request, 'user_post.html',{"Post":optionsA})
    else:
        optionsB=Post.objects.raw('select * from homepage')
        return render(request, 'user_post.html',{"Post":optionsB})
