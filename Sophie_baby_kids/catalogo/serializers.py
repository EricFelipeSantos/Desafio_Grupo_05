from rest_framework import serializers
from .models import Produto, Categoria, Tamanho, Colecao, ImagemProduto

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

# serializer para imagens
class ImagemProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagemProduto
        fields = "__all__"

class ProdutoSerializer(serializers.ModelSerializer):
    # campo para receber múltiplas imagens no cadastro/edição
    imagens = serializers.ListField(
        child = serializers.ImageField(),
        write_only = True,
        required = False
    )

    class Meta:
        model = Produto
        fields = "__all__" # já inclui os campos: preco_promocional, faixa_etaria, material, cores

    # método create para salvar imagens, tamanhos e coleções
    def create(self, validated_data):
        imagens = validated_data.pop("imagens", [])
        tamanhos = validated_data.pop("tamanho", [])
        colecoes = validated_data.pop("colecao", [])

        produto = Produto.objects.create(**validated_data)

        produto.tamanho.set(tamanhos)
        produto.colecao.set(colecoes)

        for imagem in imagens:
            ImagemProduto.objects.create(
                produto = produto,
                imagem = imagem
            )

        return produto

    # método update para atualizar imagens, tamanhos e coleções
    def update(self, instance, validated_data):
        imagens = validated_data.pop("imagens", [])
        tamanhos = validated_data.pop("tamanho", [])
        colecoes = validated_data.pop("colecao", [])

        for campo, valor in validated_data.items():
            setattr(instance, campo, valor)

        instance.save()

        if tamanhos:
            instance.tamanho.set(tamanhos)

        if colecoes:
            instance.colecao.set(colecoes)

        for imagem in imagens:
            ImagemProduto.objects.create(
                produto = instance,
                imagem = imagem
            )

        return instance

class ProdutoListSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only = True)
    tamanho = TamanhoSerializer(many = True, read_only = True)
    colecao = ColecaoSerializer(many = True, read_only = True)
    # adicionei imagens no ListSerializer
    imagens = ImagemProdutoSerializer(
        many = True,
        read_only = True
    )

    class Meta:
        model = Produto
        fields = "__all__"