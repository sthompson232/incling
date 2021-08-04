from rest_framework import serializers
from .models import Tile, Task


class TileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tile 
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task 
        fields = '__all__'

        