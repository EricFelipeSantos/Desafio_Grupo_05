import "./GerenciarProdutos.css";

import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useProducts } from "../../context/ProductContext/ProductContext";

import formatPrice from "../../utils/formatPrice";

function GerenciarProdutos() {
    const {
        produtos,
        excluirProduto
    } = useProducts();

    function handleExcluir(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este produto?"
        );

        if (!confirmar) {
            return;
        }

        excluirProduto(id);

        alert("Produto excluído com sucesso.");
    }

    return (
        <>
            <Navbar />

            <main className="gerenciar-page">
                <section className="gerenciar-container">
                    <div className="gerenciar-header">
                        <div>
                            <h1>
                                Gerenciar Produtos
                            </h1>

                            <p>
                                Visualize, edite ou exclua os produtos da loja.
                            </p>
                        </div>

                        <Link
                            to="/produto/novo"
                            className="new-product-button"
                        >
                            Cadastrar Produto
                        </Link>

                    </div>

                    <div className="products-table">

                        {produtos.length === 0 ? (

                            <p className="empty-products">
                                Nenhum produto cadastrado.
                            </p>

                        ) : (

                            produtos.map((produto) => (

                                <div
                                    className="product-admin-card"
                                    key={produto.id}
                                >

                                    <div className="product-admin-image">

                                        <img
                                            src={
                                                produto.imagens?.[0]
                                                || produto.imagem
                                            }
                                            alt={produto.nome}
                                        />

                                    </div>

                                    <div className="product-admin-info">

                                        <h2>
                                            {produto.nome}
                                        </h2>

                                        <p>
                                            Categoria: {produto.categoria}
                                        </p>

                                        <strong>
                                            {formatPrice(produto.preco)}
                                        </strong>

                                    </div>

                                    <div className="product-admin-actions">

                                        <Link
                                            to={`/produto/editar/${produto.id}`}
                                            className="edit-product-button"
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            className="delete-product-button"
                                            onClick={() =>
                                                handleExcluir(produto.id)
                                            }
                                        >
                                            Excluir
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default GerenciarProdutos;