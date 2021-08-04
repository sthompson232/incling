from django.urls import path
from . import views


urlpatterns = [
    path('tasks/', views.TaskAPIView.as_view(), name='tasks'),
    path('tiles/', views.TileAPIView.as_view(), name='tiles')
]