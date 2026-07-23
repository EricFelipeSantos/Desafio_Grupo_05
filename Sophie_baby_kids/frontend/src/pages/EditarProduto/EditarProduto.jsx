import "./EditarProduto.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useProducts } from "../../context/ProductContext/ProductContext";

function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        produtos,
        editarProduto
    } = useProducts();

    const produto = produtos.find(
        (item) => item.id === Number(id)
    );

    const [nome, setNome] = useState(
        produto?.nome || ""
    );

    const [preco, setPreco] = useState(
        produto?.preco || ""
    );

    const [precoPromocional, setPrecoPromocional] = useState(
        produto?.precoPromocional || ""
    );

    const [emPromocao, setEmPromocao] = useState(
        produto?.emPromocao || false
    );

    const [categoria, setCategoria] = useState(
        produto?.categoria || ""
    );

    const [faixaEtaria, setFaixaEtaria] = useState(
        produto?.faixaEtaria || ""
    );

    const [material, setMaterial] = useState(
        produto?.material || ""
    );

    const [descricao, setDescricao] = useState(
        produto?.descricao || ""
    );

    const [imagens, setImagens] = useState(
        produto?.imagens ||
        (produto?.imagem ? [produto.imagem] : [])
    );

    if (!produto) {
        return (
            <h1>
                Produto não encontrado.
            </h1>
        );
    }

    function handleAdicionarImagens(event) {
        const arquivos = Array.from(event.target.files);

        if (arquivos.length === 0) {
            return;
        }

        const novasImagens = arquivos.map((arquivo) =>
            URL.createObjectURL(arquivo)
        );

        setImagens((imagensAtuais) => [
            ...imagensAtuais,
            ...novasImagens
        ]);

        event.target.value = "";
    }

    function removerImagem(index) {
        setImagens((imagensAtuais) =>
            imagensAtuais.filter(
                (_, imagemIndex) => imagemIndex !== index
            )
        );
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (nome.trim() === "") {
            alert("Informe o nome do produto.");
            return;
        }

        if (preco === "" || Number(preco) <= 0) {
            alert("O preço deve ser maior que zero.");
            return;
        }

        if (categoria === "") {
            alert("Selecione uma categoria.");
            return;
        }

        if (
            emPromocao &&
            (
                precoPromocional === "" ||
                Number(precoPromocional) <= 0 ||
                Number(precoPromocional) >= Number(preco)
            )
        ) {
            alert(
                "O preço promocional deve ser menor que o preço original."
            );

            return;
        }

        editarProduto(
            Number(id),
            {
                nome: nome.trim(),

                preco: Number(preco),

                emPromocao,

                precoPromocional: emPromocao
                    ? Number(precoPromocional)
                    : null,

                categoria,

                faixaEtaria: faixaEtaria.trim(),

                material: material.trim(),

                descricao: descricao.trim(),

                imagens,

                imagem: imagens[0] || ""
            }
        );

        alert("Produto atualizado com sucesso!");

        navigate("/gerenciar-produtos");
    }

    return (
        <>
            <Navbar />

            <main className="editar-page">

                <section className="editar-container">

                    <div className="editar-header">

                        <h1>
                            Editar Produto
                        </h1>

                        <p>
                            Atualize as informações do produto.
                        </p>

                    </div>

                    <form
                        className="editar-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label>
                                Nome do produto
                            </label>

                            <input
                                type="text"
                                value={nome}
                                onChange={(event) =>
                                    setNome(event.target.value)
                                }
                            />

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Preço original
                                </label>

                                <input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={preco}
                                    onChange={(event) =>
                                        setPreco(event.target.value)
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Categoria
                                </label>

                                <select
                                    value={categoria}
                                    onChange={(event) =>
                                        setCategoria(event.target.value)
                                    }
                                >

                                    <option value="">
                                        Selecione uma categoria
                                    </option>

                                    <option value="meninas">
                                        Meninas
                                    </option>

                                    <option value="meninos">
                                        Meninos
                                    </option>

                                    <option value="unissex">
                                        Unissex
                                    </option>

                                    <option value="bebes">
                                        Bebês
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="promotion-box">

                            <label className="promotion-checkbox">

                                <input
                                    type="checkbox"
                                    checked={emPromocao}
                                    onChange={(event) =>
                                        setEmPromocao(
                                            event.target.checked
                                        )
                                    }
                                />

                                <span>
                                    Produto em promoção
                                </span>

                            </label>

                            {emPromocao && (

                                <div className="promotion-price">

                                    <label>
                                        Preço promocional
                                    </label>

                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={precoPromocional}
                                        onChange={(event) =>
                                            setPrecoPromocional(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                            )}

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Faixa etária
                                </label>

                                <input
                                    type="text"
                                    value={faixaEtaria}
                                    onChange={(event) =>
                                        setFaixaEtaria(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Material
                                </label>

                                <input
                                    type="text"
                                    value={material}
                                    onChange={(event) =>
                                        setMaterial(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>
                                Imagens do produto
                            </label>

                            <small>
                                Você pode manter as imagens atuais
                                e adicionar novas imagens.
                            </small>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleAdicionarImagens}
                            />

                            {imagens.length > 0 && (

                                <div className="image-preview-grid">

                                    {imagens.map(
                                        (imagem, index) => (

                                            <div
                                                className="image-preview"
                                                key={index}
                                            >

                                                <img
                                                    src={imagem}
                                                    alt={
                                                        `${nome} ${index + 1}`
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removerImagem(
                                                            index
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                        <div className="form-group">

                            <label>
                                Descrição
                            </label>

                            <textarea
                                rows="5"
                                value={descricao}
                                onChange={(event) =>
                                    setDescricao(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="editar-actions">

                            <button
                                type="button"
                                className="cancel-edit-button"
                                onClick={() =>
                                    navigate(
                                        "/gerenciar-produtos"
                                    )
                                }
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="save-edit-button"
                            >
                                Salvar alterações
                            </button>

                        </div>

                    </form>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default EditarProduto;