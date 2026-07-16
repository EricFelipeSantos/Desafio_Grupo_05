from rest_framework.viewsets import ModelViewSet
from .models import Produto, Categoria, Tamanho, Colecao
from .serializers import (
    ProdutoSerializer,
    CategoriaSerializer,
    TamanhoSerializer,
    ColecaoSerializer
)


class ProdutoViewSet(ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer


class CategoriaViewSet(ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class TamanhoViewSet(ModelViewSet):
    queryset = Tamanho.objects.all()
    serializer_class = TamanhoSerializer


class ColecaoViewSet(ModelViewSet):
    queryset = Colecao.objects.all()
    serializer_class = ColecaoSerializer