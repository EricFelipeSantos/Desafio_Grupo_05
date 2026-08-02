import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaFilter, FaTimes } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";

import { useProducts } from "../../context/ProductContext/ProductContext";

import "./Produtos.css";

function Produtos() {
    const { produtos, getImageUrl } = useProducts();

    const [searchParams, setSearchParams] = useSearchParams();

    const [publicoSelecionado, setPublicoSelecionado] = useState(
        searchParams.get("publico") || ""
    );

    const [categoriaSelecionada, setCategoriaSelecionada] = useState(
        searchParams.get("categoria") || ""
    );

    const [busca, setBusca] = useState(
        searchParams.get("busca") || ""
    );

    const [precoMinimo, setPrecoMinimo] = useState("");

    const [precoMaximo, setPrecoMaximo] = useState("");

    const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

    const [somentePromocoes, setSomentePromocoes] = useState(false);

    const [filtrosAbertos, setFiltrosAbertos] = useState(
        searchParams.get("filtros") === "true"
    );

    const categorias = [
        "Todas",
        ...new Set(
            produtos
                .map(p => p.categoria?.nome)
                .filter(Boolean)
        )
    ];

    const tamanhos = [
        ...new Set(
            produtos
                .flatMap(p => p.tamanho?.map(t => t.nome) || [])
                .filter(Boolean)
        )
    ];

    useEffect(() => {
        const categoriaURL = searchParams.get("categoria") || "";
        const buscaURL = searchParams.get("busca") || "";
        const publicoURL = searchParams.get("publico") || "";
        const filtrosURL = searchParams.get("filtros") === "true";

        setCategoriaSelecionada(categoriaURL);
        setBusca(buscaURL);
        setPublicoSelecionado(publicoURL);
        setFiltrosAbertos(filtrosURL);
    }, [searchParams]);

    function selecionarCategoria(categoria) {
        const novosParametros = new URLSearchParams(searchParams);

        if (categoria === "Todas") {
            setCategoriaSelecionada("");
            novosParametros.delete("categoria");
            setSearchParams(novosParametros);
            return;
        }

        setCategoriaSelecionada(categoria);
        novosParametros.set("categoria", categoria);
        setSearchParams(novosParametros);
    }

    function alterarCategoriaFiltro(event) {
        const categoria = event.target.value;
        setCategoriaSelecionada(categoria);

        const novosParametros = new URLSearchParams(searchParams);

        if (categoria === "") {
            novosParametros.delete("categoria");
        } else {
            novosParametros.set("categoria", categoria);
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

    const calcularValorParcela = (preco, parcelas, juros) => {
        if (!preco || !parcelas || parcelas === 0) return 0;
        const precoBaseNum = Number(preco);
        const numParcelas = Number(parcelas);
        const taxaJuros = Number(juros) || 0;
        
        if (taxaJuros === 0) {
            return precoBaseNum / numParcelas;
        }
        return (precoBaseNum * (1 + taxaJuros / 100)) / numParcelas;
    };

    const produtosFiltrados = produtos.filter((produto) => {
        const precoProduto =
            produto.em_promocao &&
            produto.preco_promocional &&
            Number(produto.preco_promocional) < Number(produto.preco)
                ? Number(produto.preco_promocional)
                : Number(produto.preco);

        const nomeCategoria = produto.categoria?.nome?.toLowerCase() || "";
        const nomePublico = produto.publico?.toLowerCase() || "";
        const nomeProduto = produto.nome?.toLowerCase() || "";
        const descricaoProduto = produto.descricao?.toLowerCase() || "";

        const buscaNormalizada = busca.toLowerCase();
        const categoriaNormalizada = categoriaSelecionada.toLowerCase();

        const buscaValida =
            !busca ||
            nomeProduto.includes(buscaNormalizada) ||
            nomeCategoria.includes(buscaNormalizada) ||
            nomePublico.includes(buscaNormalizada) ||
            descricaoProduto.includes(buscaNormalizada);

        const categoriaValida =
            !categoriaSelecionada ||
            String(produto.categoria?.id) === String(categoriaSelecionada);

        const publicoValido =
            !publicoSelecionado ||
            produto.publico === publicoSelecionado;

        const precoMinimoValido =
            !precoMinimo || precoProduto >= Number(precoMinimo);

        const precoMaximoValido =
            !precoMaximo || precoProduto <= Number(precoMaximo);

        const tamanhoValido =
            !tamanhoSelecionado ||
            produto.tamanho?.some(
                (tamanho) => tamanho.nome === tamanhoSelecionado
            );

        const promocaoValida =
            !somentePromocoes ||
            (produto.em_promocao &&
                produto.preco_promocional &&
                Number(produto.preco_promocional) < Number(produto.preco));

        return (
            buscaValida &&
            categoriaValida &&
            publicoValido &&
            precoMinimoValido &&
            precoMaximoValido &&
            tamanhoValido &&
            promocaoValida
        );
    });

    return (
        <>
            <Navbar />

            <main className="catalog-page">
                <section className="catalog-header">
                    <h1>Nossos Produtos</h1>
                    <p>
                        Encontre roupas confortáveis e especiais para os pequenos.
                    </p>
                </section>

                <section className="catalog-content">
                    {/* CATEGORIAS EM CIMA */}
                    <div className="category-filter-buttons">
                        {categorias.map((categoria) => (
                            <button
                                type="button"
                                key={categoria}
                                className={
                                    (categoria === "Todas" && !categoriaSelecionada) ||
                                    categoria === categoriaSelecionada
                                        ? "active"
                                        : ""
                                }
                                onClick={() => selecionarCategoria(categoria)}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>

                    <div className="catalog-layout">
                        {/* FILTROS AO LADO */}
                        <aside className="filters-sidebar">
                            <div className="filters-header">
                                <h3>
                                    <FaFilter /> Filtrar produtos
                                </h3>
                                <button
                                    type="button"
                                    className="close-filter-button"
                                    onClick={() => setFiltrosAbertos(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="filters-body">
                                <div className="filter-group">
                                    <label>Categoria</label>
                                    <select
                                        value={categoriaSelecionada}
                                        onChange={alterarCategoriaFiltro}
                                    >
                                        <option value="">Todas as categorias</option>
                                        {categorias
                                            .filter((categoria) => categoria !== "Todas")
                                            .map((categoria) => (
                                                <option key={categoria} value={categoria}>
                                                    {categoria}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Faixa de preço</label>
                                    <div className="price-filter">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="Preço mínimo"
                                            value={precoMinimo}
                                            onChange={(event) =>
                                                setPrecoMinimo(event.target.value)
                                            }
                                        />
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="Preço máximo"
                                            value={precoMaximo}
                                            onChange={(event) =>
                                                setPrecoMaximo(event.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="filter-group">
                                    <label>Tamanho</label>
                                    <select
                                        value={tamanhoSelecionado}
                                        onChange={(event) =>
                                            setTamanhoSelecionado(event.target.value)
                                        }
                                    >
                                        <option value="">Todos os tamanhos</option>
                                        {tamanhos.map((tamanho) => (
                                            <option key={tamanho} value={tamanho}>
                                                {tamanho}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <label className="promotion-filter">
                                    <input
                                        type="checkbox"
                                        checked={somentePromocoes}
                                        onChange={(event) =>
                                            setSomentePromocoes(event.target.checked)
                                        }
                                    />
                                    Mostrar somente produtos em promoção
                                </label>

                                <button
                                    type="button"
                                    className="clear-filters-button"
                                    onClick={limparFiltros}
                                >
                                    Limpar filtros
                                </button>
                            </div>
                        </aside>

                        {/* LISTA DE PRODUTOS */}
                        <div className="catalog-products">
                            <div className="catalog-top">
                                <div>
                                    <h2>
                                        {busca
                                            ? `Resultados para "${busca}"`
                                            : categoriaSelecionada
                                            ? categoriaSelecionada
                                            : "Todos os produtos"}
                                    </h2>
                                    <span>{produtosFiltrados.length} produtos encontrados</span>
                                </div>
                            </div>

                            {produtosFiltrados.length === 0 ? (
                                <div className="no-products">
                                    <h2>Nenhum produto encontrado</h2>
                                    <p>Tente alterar os filtros selecionados.</p>
                                    <button type="button" onClick={limparFiltros}>
                                        Limpar filtros
                                    </button>
                                </div>
                            ) : (
                                <div className="catalog-grid">
                                    {produtosFiltrados.map((produto) => {
                                        const imageUrl = getImageUrl(produto.imagens?.[0]?.imagem);
                                        
                                        const estaEmPromocao = produto.em_promocao && 
                                            produto.preco_promocional && 
                                            Number(produto.preco_promocional) < Number(produto.preco);
                                        
                                        const precoBase = estaEmPromocao 
                                            ? Number(produto.preco_promocional) 
                                            : Number(produto.preco);
                                        
                                        const parcelas = Number(produto.parcelas) || 10;
                                        const juros = Number(produto.juros_parcelas) || 0;
                                        const valorParcela = calcularValorParcela(precoBase, parcelas, juros);
                                        const precoPix = produto.preco_pix 
                                            ? Number(produto.preco_pix) 
                                            : precoBase * 0.95;

                                        return (
                                            <ProductCard
                                                key={produto.id}
                                                id={produto.id}
                                                nome={produto.nome}
                                                preco={produto.preco}
                                                emPromocao={produto.em_promocao}
                                                precoPromocional={produto.preco_promocional}
                                                imagem={imageUrl}
                                                categoria={produto.categoria?.nome}
                                                cores={produto.cores}
                                                precoPix={precoPix}
                                                parcelas={parcelas}
                                                valorParcela={valorParcela}
                                                jurosParcelas={juros}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Produtos;