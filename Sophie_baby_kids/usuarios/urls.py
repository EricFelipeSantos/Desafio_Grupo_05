from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import UsuarioViewSet, LoginView

router = DefaultRouter()
router.register("usuarios", UsuarioViewSet)

urlpatterns = router.urls + [ # rota para login
    path('login/', LoginView.as_view(), name='login'),
]

# eu criei um super usuário. Caso a cliente esqueça a senha e precise mudar, aí recomendo mudar
# pelo terminal: 
# python manage.py changepassword admin