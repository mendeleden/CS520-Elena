from rest_framework import routers
from .api import LocationViewSet

router = routers.DefaultRouter()
router.register('api/location', LocationViewSet, 'location')

urlpatterns = router.urls