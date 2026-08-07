# Sophie Baby Kids 👶🎀

E-commerce de roupas infantis com painel administrativo completo para gerenciamento de produtos, banners e pedidos, além de finalização de compra integrada ao WhatsApp.

## 📌 Sobre o projeto

Este projeto foi desenvolvido como parte da segunda fase do programa **Bolsa Futuro Digital**, na qual a entrega é feita diretamente para uma cliente real. O sistema foi construído para atender às necessidades da **Sophie Baby Kids**, uma loja de roupas infantis, oferecendo tanto uma vitrine de produtos para os clientes finais quanto um painel administrativo completo para a gestão do catálogo, banners promocionais e pedidos realizados.

## 🔗 Acesse o site

**[Sophie Baby Kids](https://sophie-baby-kids.vercel.app)**

## 🚀 Tecnologias

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- React Router DOM
- React Icons

### Backend
- [Django](https://www.djangoproject.com/) + [Django REST Framework](https://www.django-rest-framework.org/)
- Simple JWT (autenticação)
- Django Filters
- PostgreSQL (produção) / SQLite (desenvolvimento)

### Infraestrutura
- **Frontend:** [Vercel](https://vercel.com/)
- **Backend:** [Render](https://render.com/)
- **Armazenamento de mídia:** [Supabase Storage](https://supabase.com/storage)
- **Automação:** GitHub Actions (keep-alive do backend)

## ✨ Funcionalidades

### Área do cliente
- Catálogo de produtos com filtros por público, categoria e faixa de preço
- Busca com sugestões em tempo real (foto, nome e preço)
- Página de detalhes do produto
- Carrinho de compras (adicionar, remover, ajustar quantidade)
- Finalização de pedido com múltiplas formas de pagamento (PIX, Cartão, Boleto, Dinheiro)
- Envio automático do pedido via WhatsApp
- Compra rápida direto pelo WhatsApp, sem passar pelo carrinho
- Botão de contato via WhatsApp em todas as páginas

### Área administrativa
- Login autenticado via JWT
- Painel com métricas gerais (produtos, pedidos, clientes, vendas)
- Cadastro e edição de produtos (com múltiplas imagens, cores, tamanhos, preços e parcelamento)
- Compressão automática de imagens antes do upload
- Gerenciamento de banners promocionais da página inicial
- Gerenciamento de pedidos com busca, filtro por status e atualização automática via WhatsApp

## 📁 Estrutura do projeto

```
Sophie_baby_kids/
├── frontend/          # Aplicação React (Vite)
└── Sophie_baby_kids/   # Projeto Django
    ├── catalogo/       # Produtos, categorias, tamanhos, banners
    └── usuarios/       # Autenticação e usuários administrativos
```

## ⚙️ Como rodar o projeto localmente

### Pré-requisitos
- Python 3.11+
- Node.js 18+
- Git

### Backend

```bash
cd Sophie_baby_kids

# Criar e ativar ambiente virtual
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # Linux/Mac

# Instalar dependências
pip install -r requirements.txt

# Criar arquivo .env na raiz do backend
DEBUG=True
SECRET_KEY=sua-chave-secreta

# Aplicar migrations
python manage.py migrate

# Rodar o servidor
python manage.py runserver
```

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev
```

## 🔑 Variáveis de ambiente

### Backend (`.env`)

| Variável | Descrição |
|---|---|
| `DEBUG` | `True` para desenvolvimento local |
| `SECRET_KEY` | Chave secreta do Django |
| `DATABASE_URL` | String de conexão do PostgreSQL (produção) |

### Frontend (`.env` ou configuração do Vercel)

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API (ex: `https://sua-api.onrender.com`) |

## 🌐 Deploy

- **Backend:** hospedado no Render, com deploy automático a cada push na branch `main`.
- **Frontend:** hospedado na Vercel, com deploy automático a cada push na branch `main`.
- **Mídia:** imagens de produtos e banners armazenadas no Supabase Storage, garantindo persistência entre deploys.

## 👥 Autoria

Desenvolvido por [Seu Nome] e [Nome da Colega], como parte da segunda fase do programa Bolsa Futuro Digital, em parceria direta com a cliente Sophie Baby Kids.

## 📄 Licença

Este projeto foi desenvolvido para a cliente Sophie Baby Kids como parte do programa Bolsa Futuro Digital. Todos os direitos reservados.
