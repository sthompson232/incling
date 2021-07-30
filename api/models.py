from django.db import models

# I could ask a choice field for fields like status, and task type, but as it is a REST API, these choices will be handled on the frontend, so I have left them as CharFields.

class Tile(models.Model):
    launch_date = models.DateField()
    status = models.CharField(max_length=64)

    def __str__(self):
        return str(self.launch_date)

class Task(models.Model):
    title = models.CharField(max_length=64)
    order = models.CharField(max_length=64)
    description = models.CharField(max_length=255)
    task_type = models.CharField(max_length=255)
    tile = models.ForeignKey(Tile, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
