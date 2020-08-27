from django.shortcuts import render
from django.http import HttpResponse

from .models import User

def home(request):
    return render(request, 'home.html')

def ranking_detail(request):
    players = User.objects.all()
    return render(request, 'ranking.html', {
        'players': players,
    })

def about(request):
    return render(request, 'about.html')
