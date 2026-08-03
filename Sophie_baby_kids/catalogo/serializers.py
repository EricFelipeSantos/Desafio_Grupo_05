from rest_framework import serializers
from .models import Produto, Categoria, Tamanho, Colecao, ImagemProduto, Banner
import json

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


class ImagemProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagemProduto
        fields = "__all__"


class ProdutoSerializer(serializers.ModelSerializer):
    imagens = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Produto
        fields = "__all__"

    def create(self, validated_data):
        imagens = validated_data.pop("imagens", [])
        tamanhos = validated_data.pop("tamanho", [])
        colecoes = validated_data.pop("colecao", [])

        produto = Produto.objects.create(**validated_data)

        produto.tamanho.set(tamanhos)
        produto.colecao.set(colecoes)

        for imagem in imagens:
            ImagemProduto.objects.create(
                produto=produto,
                imagem=imagem
            )

        return produto

    def update(self, instance, validated_data):
        imagens = validated_data.pop("imagens", [])
        tamanhos = validated_data.pop("tamanho", [])
        colecoes = validated_data.pop("colecao", [])
        
        # pega 'imagens_remover' direto do request enviado pelo React
        request = self.context.get('request')
        imagens_remover_raw = request.data.get("imagens_remover") if request else None
        
        if imagens_remover_raw:
            ids_para_remover = []
            
            if isinstance(imagens_remover_raw, str):
                try:
                    ids_para_remover = json.loads(imagens_remover_raw)
                except json.JSONDecodeError:
                    ids_para_remover = []
            elif isinstance(imagens_remover_raw, list):
                ids_para_remover = imagens_remover_raw
            
            # deleta as imagens do banco e da pasta media
            if ids_para_remover:
                # garante que só vai deletar imagens que realmente pertencem a este produto
                imagens_para_deletar = ImagemProduto.objects.filter(
                    id__in=ids_para_remover,
                    produto=instance
                )
                
                for imagem_obj in imagens_para_deletar:
                    # deleta o arquivo físico da pasta media/ automaticamente
                    if imagem_obj.imagem:
                        imagem_obj.imagem.delete(save=False)
                    # deleta o registro do banco de dados (PostgreSQL)
                    imagem_obj.delete()

        # atualiza os demais campos simples do produto
        for campo, valor in validated_data.items():
            setattr(instance, campo, valor)

        instance.save()

        # atualiza os relacionamentos ManyToMany
        if tamanhos:
            instance.tamanho.set(tamanhos)

        if colecoes:
            instance.colecao.set(colecoes)

        # adiciona as novas imagens enviadas
        for imagem in imagens:
            ImagemProduto.objects.create(
                produto=instance,
                imagem=imagem
            )

        return instance


class ProdutoListSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    tamanho = TamanhoSerializer(many=True, read_only=True)
    colecao = ColecaoSerializer(many=True, read_only=True)
    imagens = ImagemProdutoSerializer(many=True, read_only=True)

    class Meta:
        model = Produto
        fields = "__all__"
        
class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = "__all__"