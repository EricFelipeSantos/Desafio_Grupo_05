from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet

from .models import Produto, Categoria, Tamanho, Colecao
from .serializers import (
    ProdutoSerializer,
    ProdutoListSerializer,
    CategoriaSerializer,
    TamanhoSerializer,
    ColecaoSerializer
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
        "genero",
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