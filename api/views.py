from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import TaskSerializer, TileSerializer
from .models import Tile, Task


class TaskViewSet(viewsets.ModelViewSet):

    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def get_queryset(self):
        return self.queryset

    def retrieve(self, request, pk=None):
        queryset = Task.objects.all()
        task = get_object_or_404(queryset, pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)


class TileViewSet(viewsets.ModelViewSet):

    serializer_class = TileSerializer
    queryset = Tile.objects.all()

    def get_queryset(self):
        return self.queryset

    def retrieve(self, request, pk=None):
        queryset = Tile.objects.all()
        tile = get_object_or_404(queryset, pk=pk)
        serializer = TileSerializer(tile)
        return Response(serializer.data)