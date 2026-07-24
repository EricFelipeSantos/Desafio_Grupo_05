import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import PromotionBanner from "../../components/PromotionBanner/PromotionBanner";
import CategorySection from "../../components/CategorySection/CategorySection";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import Footer from "../../components/Footer/Footer";

import { useProducts } from "../../context/ProductContext/ProductContext";

function Home() {
    const navigate = useNavigate();

    const { produtos } = useProducts();

    const [
        categoriaSelecionada,
        setCategoriaSelecionada
    ] = useState("Todos");

    function selecionarCategoria(categoria) {
        setCategoriaSelecionada(categoria);
    }

    function abrirFiltros() {
        navigate("/produtos?filtros=true");
    }

    function verTodosProdutos() {
        navigate("/produtos");
    }

    const produtosFiltrados =
        categoriaSelecionada === "Todos" ? produtos : categoriaSelecionada === "Promoções" ? produtos.filter(
            (produto) =>
                produto.emPromocao === true &&
                Number(
                    produto.precoPromocional
                ) <
                Number(
                    produto.preco
                )
        ) : produtos.filter(
            (produto) => {
                    const categoria =
                        produto.categoria?.toLowerCase();

                    const publico =
                        produto.publico?.toLowerCase();

                    const filtro =
                        categoriaSelecionada.toLowerCase();

                    return (
                        categoria === filtro ||
                        publico === filtro
                    );
                }
            );
    return (
        <>
            <Navbar />

            <HeroSection />

            <PromotionBanner />

            <CategorySection
                categoriaSelecionada={categoriaSelecionada}
                onCategoriaSelecionada={selecionarCategoria}
                onAbrirFiltros={abrirFiltros}
            />

            <ProductsSection
                produtos={produtosFiltrados}
                categoriaSelecionada={categoriaSelecionada}
                onVerTodosProdutos={verTodosProdutos}
            />

            <Footer />
        </>
    );
}

export default Home;