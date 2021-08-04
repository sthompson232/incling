from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import datetime
from .models import Tile, Task
from .serializers import TaskSerializer, TileSerializer


class TaskAPIView(APIView):

    def get(self, request):
        query_tile_id = request.GET.get('tile')
        if query_tile_id:
            tasks = Task.objects.filter(tile__id=query_tile_id)
        else:
            tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        tile_id = request.data['tileId']
        title = request.data['title']
        description = request.data['description']
        task_order = request.data['order']
        task_type = request.data['taskType']

        new_task = Task.objects.create(
            tile_id = tile_id,
            title=title,
            description=description,
            order=task_order,
            task_type=task_type
            )
        new_task.save()
        return Response(status=status.HTTP_200_OK)

    def put(self, request):
        task_id = request.data['taskId']
        title = request.data['title']
        description = request.data['description']
        task_order = request.data['order']
        task_type = request.data['taskType']

        new_task = Task.objects.filter(id = task_id).update(
            title=title,
            description=description,
            order=task_order,
            task_type=task_type
        )
        return Response(status=status.HTTP_200_OK)

    def delete(self, request):
        task = Task.objects.get(id=request.data['taskId'])
        task.delete()
        return Response(status=status.HTTP_200_OK)


class TileAPIView(APIView):

    def get(self, request):
        tiles = Tile.objects.all()
        serializer = TileSerializer(tiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        tile_status = request.data['status']
        date = datetime.datetime.fromtimestamp(int(request.data['date']) / float(1000))
        new_tile = Tile.objects.create(status=tile_status, launch_date=date)
        new_tile.save()
        return Response(status=status.HTTP_200_OK)

    def put(self, request):
        tile = Tile.objects.filter(id=request.data['tileId'])
        tile_status = request.data['status']
        date = datetime.datetime.fromtimestamp(int(request.data['date']) / float(1000))
        tile.update(launch_date=date, status=tile_status)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request):
        tile = Tile.objects.get(id=request.data['tileId'])
        related_tasks = Task.objects.filter(tile__id=request.data['tileId'])
        tile.delete()
        related_tasks.delete()
        return Response(status=status.HTTP_200_OK)