from django.db import models

# tile status choices live, pending, archived

class Tile(models.Model):
    launch_date = models.DateField()
    status = models.CharField(max_length=64)

    class Meta:
        ordering = ['-launch_date']

    def __str__(self):
        return str(self.launch_date)

# task type choices survey discussion diary

class Task(models.Model):
    title = models.CharField(max_length=64)
    order = models.CharField(max_length=64)
    description = models.CharField(max_length=255)
    task_type = models.CharField(max_length=255)
    tile = models.ForeignKey(Tile, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
