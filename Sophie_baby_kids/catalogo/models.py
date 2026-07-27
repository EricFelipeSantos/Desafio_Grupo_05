from django.db import models

# Alguns campos que estão no CadastroProduto.jsx não estavam aqui:
# 1 - Preço Promocional: o banco sabia apenas que o produto poderia estar na promoção,
# mas não sabia qual era o preço promocional.
# 2 - Adição da faixa etária.
# 3 - Adição do material.
# 4 - Um produto pode ter mais de uma imagem.
# 5 - Adição das cores com nome e código hexadecimal.

class Categoria(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Tamanho(models.Model):
    nome = models.CharField(max_length=10)

    def __str__(self):
        return self.nome

class Colecao(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Produto(models.Model):
    PUBLICO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Feminino'),
        ('B', 'Bebês'),
        ('U', 'Unissex'),
    ]

    nome = models.CharField(max_length = 150)
    categoria = models.ForeignKey(Categoria, on_delete = models.PROTECT)
    descricao = models.TextField(blank = True)
    preco = models.DecimalField(max_digits = 10, decimal_places = 2, null = True, blank = True)
    em_promocao = models.BooleanField(default = False)
    preco_promocional = models.DecimalField(max_digits = 10, decimal_places = 2, null = True, blank = True)
    publico = models.CharField(max_length = 1, choices = PUBLICO_CHOICES, default = 'U')
    tamanho = models.ManyToManyField(Tamanho, blank = True)
    colecao = models.ManyToManyField(Colecao, blank = True)
    faixa_etaria = models.CharField(max_length = 50, blank = True)
    material = models.CharField(max_length = 100, blank = True)
    cores = models.JSONField(default = list, blank = True)

    def __str__(self):
        return self.nome

class ImagemProduto(models.Model):
    produto = models.ForeignKey(
        Produto,
        on_delete=models.CASCADE,
        related_name='imagens'
    )
    imagem = models.ImageField(upload_to='produtos/')

    def __str__(self):
        return f"Imagem de {self.produto.nome}"