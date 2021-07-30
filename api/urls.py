from rest_framework import routers
from .views import TileViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register('tiles', TileViewSet, 'tiles')
router.register('tasks', TaskViewSet, 'tasks')

urlpatterns = router.urls