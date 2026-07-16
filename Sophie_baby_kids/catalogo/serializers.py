from rest_framework import serializers
from .models import Produto, Categoria, Tamanho, Colecao


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"


class TamanhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tamanho
        fields = "__all__"


class ColecaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colecao
        fields = "__all__"


class ProdutoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Produto
        fields = "__all__"