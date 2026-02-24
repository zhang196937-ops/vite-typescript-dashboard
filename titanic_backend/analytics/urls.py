from django.urls import path
from . import views

urlpatterns = [
    path('passengers/', views.passenger_list, name='passenger-list'),
    # add api for statistics.
    path('stats/', views.survival_stats, name='survival_stats'),  
]