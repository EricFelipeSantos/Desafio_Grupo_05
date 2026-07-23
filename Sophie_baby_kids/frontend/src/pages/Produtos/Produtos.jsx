import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { FaFilter, FaTimes } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";

import { useProducts } from "../../context/ProductContext/ProductContext";

import "./Produtos.css";

function Produtos() {
    const { produtos } = useProducts();

    const [searchParams, setSearchParams] = useSearchParams();

    const [categoriaSelecionada, setCategoriaSelecionada] = useState(searchParams.get("categoria") || "");

    const [busca, setBusca] = useState(searchParams.get("busca") || "");

    const [precoMinimo, setPrecoMinimo] = useState("");

    const [precoMaximo, setPrecoMaximo] = useState("");

    const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

    const [somentePromocoes, setSomentePromocoes] = useState(false);

    const [filtrosAbertos, setFiltrosAbertos] = useState(
        searchParams.get("filtros") === "true"
    );

    const categorias = [
        "Todas",
        "Vestidos",
        "Conjuntos",
        "Meninas",
        "Meninos",
        "Bebês",
        "Unissex"
    ];

    const tamanhos = [
        "RN",
        "P",
        "M",
        "G",
        "GG",
        "1",
        "2",
        "3",
        "4",
        "6",
        "8",
        "10",
        "12",
        "14",
        "16"
    ];

    useEffect(() => {
        const categoriaURL = searchParams.get("categoria") || "";

        const buscaURL = searchParams.get("busca") || "";

        const filtrosURL =
            searchParams.get("filtros") === "true";

        setCategoriaSelecionada(categoriaURL);

        setBusca(buscaURL);

        setFiltrosAbertos(filtrosURL);

    }, [searchParams]);

    function selecionarCategoria(categoria) {
        if (categoria === "Todas") {
            setCategoriaSelecionada("");

            const novosParametros = new URLSearchParams(
                searchParams
            );

            novosParametros.delete("categoria");

            setSearchParams(novosParametros);

            return;
        }

        setCategoriaSelecionada(categoria);

        const novosParametros = new URLSearchParams(
            searchParams
        );

        novosParametros.set(
            "categoria",
            categoria
        );

        setSearchParams(novosParametros);
    }

    function alterarCategoriaFiltro(event) {
        const categoria = event.target.value;

        setCategoriaSelecionada(categoria);

        const novosParametros = new URLSearchParams(
            searchParams
        );

        if (categoria === "") {
            novosParametros.delete("categoria");

        } else {
            novosParametros.set(
                "categoria",
                categoria
            );
        }

        setSearchParams(novosParametros);
    }

    function limparFiltros() {
        setCategoriaSelecionada("");

        setBusca("");

        setPrecoMinimo("");

        setPrecoMaximo("");

        setTamanhoSelecionado("");

        setSomentePromocoes(false);

        setSearchParams({});

    }

    const produtosFiltrados =
        produtos.filter(
            (produto) => {
                const precoProduto =
                    produto.emPromocao &&
                    produto.precoPromocional &&
                    Number(
                        produto.precoPromocional
                    ) <
                    Number(
                        produto.preco
                    )
                        ? Number(
                            produto.precoPromocional
                        )
                        : Number(
                            produto.preco
                        );

                const buscaValida =
                    !busca ||
                    produto.nome?.toLowerCase().includes(
                        busca.toLowerCase()
                    ) ||
                    produto.categoria?.toLowerCase().includes(
                        busca.toLowerCase()
                    ) ||
                    produto.publico?.toLowerCase().includes(
                        busca.toLowerCase()
                    ) ||
                    produto.descricao?.toLowerCase().includes(
                        busca.toLowerCase()
                    );

                const categoriaValida =
                    !categoriaSelecionada ||
                    produto.categoria?.toLowerCase() ===
                    categoriaSelecionada.toLowerCase();

                const precoMinimoValido =
                    !precoMinimo ||
                    precoProduto >=
                    Number(
                        precoMinimo
                    );

                const precoMaximoValido =
                    !precoMaximo ||
                    precoProduto <=
                    Number(
                        precoMaximo
                    );

                const tamanhoValido =
                    !tamanhoSelecionado ||
                    produto.tamanhos?.includes(
                        tamanhoSelecionado
                    );

                const promocaoValida =
                    !somentePromocoes ||
                    (
                        produto.emPromocao &&
                        produto.precoPromocional &&
                        Number(
                            produto.precoPromocional
                        ) <
                        Number(
                            produto.preco
                        )
                    );

                return (
                    buscaValida &&
                    categoriaValida &&
                    precoMinimoValido &&
                    precoMaximoValido &&
                    tamanhoValido &&
                    promocaoValida
                );
            }
        );

    return (
        <>
            <Navbar />

            <main className="catalog-page">
                <section className="catalog-header">
                    <h1>
                        Nossos Produtos
                    </h1>

                    <p>
                        Encontre roupas confortáveis e especiais para os pequenos.
                    </p>
                </section>

                <section className="catalog-content">
                    <div className="catalog-top">
                        <div>
                            <h2>
                                {
                                    busca
                                        ? `Resultados para "${busca}"`
                                        : categoriaSelecionada
                                            ? categoriaSelecionada
                                            : "Todos os produtos"
                                }
                            </h2>

                            <span>
                                {
                                    produtosFiltrados.length
                                }{" "}
                                produtos encontrados
                            </span>
                        </div>

                        <button
                            type="button"
                            className="open-filter-button"
                            onClick={() =>
                                setFiltrosAbertos(
                                    (estadoAtual) =>
                                        !estadoAtual
                                )
                            }
                        >
                            <FaFilter />
                                Filtros
                        </button>
                    </div>

                    {filtrosAbertos && (
                        <aside className="filters-panel">
                            <div className="filters-header">
                                <h3>
                                    Filtrar produtos
                                </h3>

                                <button
                                    type="button"
                                    className="close-filter-button"
                                    onClick={() =>
                                        setFiltrosAbertos(
                                            false
                                        )
                                    }
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="filter-group">
                                <label>
                                    Categoria
                                </label>

                                <select
                                    value={
                                        categoriaSelecionada
                                    }
                                    onChange={
                                        alterarCategoriaFiltro
                                    }
                                >

                                    <option value="">
                                        Todas as categorias
                                    </option>

                                    {categorias
                                        .filter(
                                            (categoria) =>
                                                categoria !==
                                                "Todas"
                                        )
                                        .map(
                                            (categoria) => (
                                                <option
                                                    key={
                                                        categoria
                                                    }
                                                    value={
                                                        categoria
                                                    }
                                                >
                                                    {
                                                        categoria
                                                    }
                                                </option>

                                            )
                                        )}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>
                                    Faixa de preço
                                </label>

                                <div className="price-filter">

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="Preço mínimo"
                                        value={
                                            precoMinimo
                                        }
                                        onChange={(event) =>
                                            setPrecoMinimo(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="Preço máximo"
                                        value={
                                            precoMaximo
                                        }
                                        onChange={(event) =>
                                            setPrecoMaximo(
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="filter-group">
                                <label>
                                    Tamanho
                                </label>

                                <select
                                    value={
                                        tamanhoSelecionado
                                    }
                                    onChange={(event) =>
                                        setTamanhoSelecionado(
                                            event.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Todos os tamanhos
                                    </option>

                                    {tamanhos.map(
                                        (tamanho) => (
                                            <option
                                                key={
                                                    tamanho
                                                }
                                                value={
                                                    tamanho
                                                }
                                            >
                                                {
                                                    tamanho
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <label className="promotion-filter">
                                <input
                                    type="checkbox"
                                    checked={
                                        somentePromocoes
                                    }
                                    onChange={(event) =>
                                        setSomentePromocoes(
                                            event.target.checked
                                        )
                                    }
                                />
                                Mostrar somente produtos em promoção
                            </label>

                            <button
                                type="button"
                                className="clear-filters-button"
                                onClick={
                                    limparFiltros
                                }
                            >
                                Limpar filtros
                            </button>
                        </aside>
                    )}

                    <div className="category-filter-buttons">
                        {categorias.map(
                            (categoria) => (
                                <button
                                    type="button"
                                    key={
                                        categoria
                                    }
                                    className={
                                        (
                                            categoria ===
                                            "Todas" &&
                                            !categoriaSelecionada
                                        ) ||
                                        categoria ===
                                        categoriaSelecionada
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        selecionarCategoria(
                                            categoria
                                        )
                                    }
                                >

                                    {
                                        categoria
                                    }
                                </button>
                            )
                        )}
                    </div>

                    {
                        produtosFiltrados.length === 0
                            ? (
                                <div className="no-products">

                                    <h2>
                                        Nenhum produto encontrado
                                    </h2>

                                    <p>
                                        Tente alterar os filtros selecionados.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={
                                            limparFiltros
                                        }
                                    >
                                        Limpar filtros
                                    </button>
                                </div>
                            )
                            : (
                                <div className="catalog-grid">
                                    {
                                        produtosFiltrados.map(
                                            (produto) => (
                                                <ProductCard
                                                    key={
                                                        produto.id
                                                    }
                                                    id={
                                                        produto.id
                                                    }
                                                    nome={
                                                        produto.nome
                                                    }
                                                    preco={
                                                        produto.preco
                                                    }
                                                    emPromocao={
                                                        produto.emPromocao
                                                    }
                                                    precoPromocional={
                                                        produto.precoPromocional
                                                    }
                                                    imagem={
                                                        produto.imagens?.[0] ||
                                                        produto.imagem
                                                    }
                                                />
                                            )
                                        )
                                    }
                                </div>
                            )
                    }
                </section>
            </main>

            <Footer />

        </>
    );
}

export default Produtos;