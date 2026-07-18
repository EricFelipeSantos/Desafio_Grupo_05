import "../ProductsSection/ProductsSection.css"

import ProductCard from "../ProductCard/ProductCard"

import vestidoVermelho from "../../assets/products/vestido-vermelho.jpg"
import vestidoAzul from "../../assets/products/vestido-azul.jpg"
import macacao from "../../assets/products/macacao.jpg"
import conjunto from "../../assets/products/conjunto.png"

const produtos = [
    {
        id: 1,
        nome: "Vestido Floral",
        preco: "79, 90",
        imagem: vestidoVermelho
    },
    {
        id: 2,
        nome: "Conjunto Infantil",
        preco: "89, 90",
        imagem: conjunto
    },
    {
        id: 3,
        nome: "Macacão Bebê",
        preco: "69, 90",
        imagem: macacao
    },
    {
        id: 4,
        nome: "Vestido Rosa",
        preco: "99, 90",
        imagem: vestidoAzul
    }
];

function ProductsSection() {
    return (
        <div className="products-grid">
            {produtos.map((produto) => (
                <ProductCard
                    key={produto.id}
                    nome={produto.nome}
                    preco={produto.preco}
                    imagem={produto.imagem}
                />
            ))}
        </div>
    )
}

export default ProductsSection