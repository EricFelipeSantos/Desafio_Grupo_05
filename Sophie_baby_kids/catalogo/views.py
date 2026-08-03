from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Produto, Categoria, Tamanho, Colecao, Banner
from .serializers import (
    ProdutoSerializer,
    ProdutoListSerializer,
    CategoriaSerializer,
    TamanhoSerializer,
    ColecaoSerializer,
    BannerSerializer
)


class ProdutoViewSet(ModelViewSet):
    queryset = Produto.objects.all()

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "categoria",
        "publico",   # mudança: "genero" para "publico"
        "em_promocao",
        "colecao",
        "tamanho",
    ]

    search_fields = [
        "nome",
        "descricao",
    ]

    ordering_fields = [
        "nome",
        "preco",
    ]
    
    # adicionei: parsers para receber imagens
    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    ordering = ["nome"]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ProdutoListSerializer
        return ProdutoSerializer


class CategoriaViewSet(ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class TamanhoViewSet(ModelViewSet):
    queryset = Tamanho.objects.all()
    serializer_class = TamanhoSerializer


class ColecaoViewSet(ModelViewSet):
    queryset = Colecao.objects.all()
    serializer_class = ColecaoSerializer
    
class BannerViewSet(ModelViewSet):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer
    parser_classes = [MultiPartParser, FormParser]