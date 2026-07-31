// src/pages/Home/Home.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import PromotionBanner from "../../components/PromotionBanner/PromotionBanner";
import CategorySection from "../../components/CategorySection/CategorySection";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import Footer from "../../components/Footer/Footer";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton";

import { useProducts } from "../../context/ProductContext/ProductContext";

// IMPORTAR AS CATEGORIAS DO NAVBAR
import { publicoCategorias } from "../../data/publicoCategoriaData";

import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const { produtos, carregando } = useProducts();

    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

    // MAPEAMENTO PÚBLICO -> NOME
    const publicoMap = {
        'U': 'Primeiros Passos',
        'F': 'Meninas',
        'M': 'Meninos',
        'B': 'Bebês'
    };

    function selecionarCategoria(categoria) {
        setCategoriaSelecionada(categoria);
    }

    function verTodosProdutos() {
        navigate("/produtos");
    }

    // FILTRA PRODUTOS PELA CATEGORIA SELECIONADA
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

        // FILTRA PELO PÚBLICO
        const nomePublico = publicoMap[produto.publico] || "";
        return nomePublico === categoriaSelecionada;
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

            <main className="home-page">
                {/* HERO SECTION - OCUPA A MAIOR PARTE DA TELA */}
                <HeroSection />

                {/* BANNER DE PROMOÇÃO */}
                <PromotionBanner />

                {/* CATEGORY SECTION COM AS CATEGORIAS DO NAVBAR */}
                <CategorySection
                    categoriaSelecionada={categoriaSelecionada}
                    onCategoriaSelecionada={selecionarCategoria}
                />

                {/* PRODUTOS */}
                <ProductsSection
                    produtos={produtosFiltrados}
                    categoriaSelecionada={categoriaSelecionada}
                    onVerTodosProdutos={verTodosProdutos}
                    carregando={carregando}
                />
            </main>

            <WhatsAppButton />
            <Footer />
        </>
    );
}

export default Home;