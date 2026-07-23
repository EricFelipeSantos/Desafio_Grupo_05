import { useParams } from "react-router-dom";

import { useProducts } from "../../context/ProductContext/ProductContext";

import Navbar from "../../components/Navbar/Navbar";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import Footer from "../../components/Footer/Footer";

import "./ProdutoDetalhes.css";

function ProdutoDetalhes() {
    const { id } = useParams();

    const { produtos } = useProducts();

    const product = produtos.find(
        (produto) =>
            produto.id === Number(id)
    );

    if (!product) {
        return (
            <>
                <Navbar />

                <main className="product-not-found">
                    <h1>
                        Produto não encontrado
                    </h1>

                    <p>
                        Este produto pode ter sido removido da loja.
                    </p>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="product-details-page">

                <div className="product-details-container">

                    <ProductInfo
                        key={product.id}
                        id={product.id}
                        nome={product.nome}
                        preco={product.preco}
                        precoPromocional={
                            product.precoPromocional
                        }
                        emPromocao={
                            product.emPromocao
                        }
                        imagem={
                            product.imagens?.[0] ||
                            product.imagem
                        }
                        imagens={
                            product.imagens
                        }
                        categoria={
                            product.categoria
                        }
                        descricao={
                            product.descricao
                        }
                        faixaEtaria={
                            product.faixaEtaria
                        }
                        material={
                            product.material
                        }
                        cores={
                            product.cores
                        }
                        tamanhos={
                            product.tamanhos
                        }
                    />

                </div>

                <RelatedProducts
                    currentProductId={
                        product.id
                    }
                />

            </main>

            <Footer />
        </>
    );
}

export default ProdutoDetalhes;