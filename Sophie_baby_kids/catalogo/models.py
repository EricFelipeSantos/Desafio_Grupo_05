from django.db import models

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
    GENERO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Feminino'),
        ('U', 'Unissex'),
    ]
    nome = models.CharField(max_length=150)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)
    imagem = models.ImageField(upload_to='produtos/')
    descricao = models.TextField(blank=True)
    preco = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    em_promocao = models.BooleanField(default=False)
    genero = models.CharField(max_length=1, choices=GENERO_CHOICES, default='U')
    tamanho = models.ManyToManyField(Tamanho, blank=True)
    colecao = models.ManyToManyField(Colecao, blank=True)

    def __str__(self):
        return self.nome
