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

import { publicoCategorias } from "../../data/publicoCategoriaData";

import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const { produtos, carregando } = useProducts();

    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

    const publicoMap = {
        'U': 'Primeiros Passos',
        'F': 'Meninas',
        'M': 'Meninos',
        'B': 'Bebês'
    };

    // MONTA A LISTA DE SUBCATEGORIAS ÚNICAS, A PARTIR DO publicoCategoriaData
    const nomesSubcategorias = [
        ...new Set(
            publicoCategorias.flatMap((publico) =>
                publico.categorias.map((categoria) => categoria.nome)
            )
        )
    ];

    const categoriasDisponiveis = ["Todos", "Promoções", ...nomesSubcategorias];

    function selecionarCategoria(categoria) {
        setCategoriaSelecionada(categoria);
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

        const nomePublico = publicoMap[produto.publico] || "";
        if (nomePublico === categoriaSelecionada) {
            return true;
        }

        const nomeCategoriaProduto = produto.categoria?.nome?.trim().toLowerCase() || "";
        const categoriaSelecionadaNormalizada = categoriaSelecionada.trim().toLowerCase();

        return nomeCategoriaProduto === categoriaSelecionadaNormalizada;
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
                <HeroSection />
                <PromotionBanner />

                <CategorySection
                    categoriaSelecionada={categoriaSelecionada}
                    onCategoriaSelecionada={selecionarCategoria}
                    categoriasDisponiveis={categoriasDisponiveis}
                />

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