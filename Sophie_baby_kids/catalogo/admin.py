from django.contrib import admin
from .models import Categoria, Tamanho, Colecao, Produto

admin.site.register(Categoria)
admin.site.register(Tamanho)
admin.site.register(Colecao)
admin.site.register(Produto)
