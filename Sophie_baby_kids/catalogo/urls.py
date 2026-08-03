from rest_framework.routers import DefaultRouter
from .views import (
    ProdutoViewSet,
    CategoriaViewSet,
    TamanhoViewSet,
    ColecaoViewSet,
    BannerViewSet
)

router = DefaultRouter()

router.register("produtos", ProdutoViewSet)
router.register("categorias", CategoriaViewSet)
router.register("tamanhos", TamanhoViewSet)
router.register("colecoes", ColecaoViewSet)
router.register("banners", BannerViewSet)


urlpatterns = router.urls