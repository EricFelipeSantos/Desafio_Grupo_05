import { useState, useEffect } from "react";
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
    const { produtos, carregando } = useProducts();

    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

    const categoriasDisponiveis = [
        "Todos",
        "Promoções",
        ...new Set(
            produtos
                .map(p => p.categoria?.nome)
                .filter(Boolean)
        )
    ];

    useEffect(() => {
        if (categoriaSelecionada !== "Todos" && 
            categoriaSelecionada !== "Promoções" &&
            !categoriasDisponiveis.includes(categoriaSelecionada)) {
            setCategoriaSelecionada("Todos");
        }
    }, [produtos, categoriaSelecionada, categoriasDisponiveis]);

    function selecionarCategoria(categoria) {
        setCategoriaSelecionada(categoria);
    }

    function abrirFiltros() {
        navigate("/produtos?filtros=true");
    }

    function verTodosProdutos() {
        navigate("/produtos");
    }

    const produtosFiltrados = produtos.filter((produto) => {
        if (categoriaSelecionada === "Todos") {
            return true;
        }

        if (categoriaSelecionada === "Promoções") {
            return (
                produto.em_promocao === true &&
                produto.preco_promocional &&
                Number(produto.preco_promocional) < Number(produto.preco)
            );
        }

        const nomeCategoria = produto.categoria?.nome?.toLowerCase() || "";
        const publico = produto.publico?.toLowerCase() || "";
        const filtro = categoriaSelecionada.toLowerCase();

        return nomeCategoria === filtro || publico === filtro;
    });

    if (carregando) {
        return (
            <>
                <Navbar />
                <div className="loading-container">
                    <p>Carregando produtos...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <HeroSection />

            <PromotionBanner />

            <CategorySection
                categoriaSelecionada={categoriaSelecionada}
                onCategoriaSelecionada={selecionarCategoria}
                onAbrirFiltros={abrirFiltros}
                categoriasDisponiveis={categoriasDisponiveis}
                produtos={produtos}
            />

            <ProductsSection
                produtos={produtosFiltrados}
                categoriaSelecionada={categoriaSelecionada}
                onVerTodosProdutos={verTodosProdutos}
                carregando={carregando}
            />

            <Footer />
        </>
    );
}

export default Home;