import "./CadastroProduto.css";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useProducts } from "../../context/ProductContext/ProductContext";

function CadastroProduto() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [publico, setPublico] = useState("");
    const [faixaEtaria, setFaixaEtaria] = useState("");
    const [material, setMaterial] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagens, setImagens] = useState([]);

    const [emPromocao, setEmPromocao] = useState(false);
    const [precoPromocional, setPrecoPromocional] = useState("");

    const [tamanhosSelecionados, setTamanhosSelecionados] = useState([]);

    const [cores, setCores] = useState([]);
    const [nomeCor, setNomeCor] = useState("");
    const [codigoCor, setCodigoCor] = useState("#FF97C0");

    const { adicionarProduto } = useProducts();

    const inputImagemRef = useRef(null);

    function alterarTamanho(tamanho) {
        if (tamanhosSelecionados.includes(tamanho)) {
            setTamanhosSelecionados(
                tamanhosSelecionados.filter(
                    (item) => item !== tamanho
                )
            );
        } else {
            setTamanhosSelecionados([
                ...tamanhosSelecionados,
                tamanho
            ]);
        }
    }

    function adicionarCor() {
        if (nomeCor.trim() === "") {
            alert("Informe o nome da cor.");
            return;
        }

        const corJaExiste = cores.some(
            (cor) =>
                cor.nome.toLowerCase() ===
                nomeCor.trim().toLowerCase()
        );

        if (corJaExiste) {
            alert("Essa cor já foi adicionada.");
            return;
        }

        const novaCor = {
            nome: nomeCor.trim(),
            codigo: codigoCor
        };

        setCores([
            ...cores,
            novaCor
        ]);

        setNomeCor("");
        setCodigoCor("#FF97C0");
    }

    function removerCor(nomeDaCor) {
        setCores(
            cores.filter(
                (cor) => cor.nome !== nomeDaCor
            )
        );
    }

    function selecionarImagens(event) {
        const arquivosSelecionados = Array.from(
            event.target.files
        );

        setImagens(arquivosSelecionados);
    }

    function removerImagem(index) {
        const novasImagens = imagens.filter(
            (_, imagemIndex) =>
                imagemIndex !== index
        );

        setImagens(novasImagens);

        if (inputImagemRef.current) {
            inputImagemRef.current.value = "";
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (nome.trim() === "") {
            alert("Informe o nome do produto.");
            return;
        }

        if (
            preco === "" ||
            Number(preco) <= 0
        ) {
            alert("O preço deve ser maior que zero.");
            return;
        }

        if (emPromocao) {
            if (
                precoPromocional === "" ||
                Number(precoPromocional) <= 0
            ) {
                alert(
                    "Informe um preço promocional válido."
                );

                return;
            }

            if (
                Number(precoPromocional) >=
                Number(preco)
            ) {
                alert(
                    "O preço promocional deve ser menor que o preço original."
                );

                return;
            }
        }

        if (categoria === "") {
            alert("Selecione o tipo de peça.");
            return;
        }

        if (publico === "") {
            alert("Selecione o público do produto.");
            return;
        }

        if (
            tamanhosSelecionados.length === 0
        ) {
            alert(
                "Selecione pelo menos um tamanho."
            );

            return;
        }

        if (cores.length === 0) {
            alert("Adicione pelo menos uma cor.");
            return;
        }

        if (faixaEtaria.trim() === "") {
            alert("Informe a faixa etária.");
            return;
        }

        if (material.trim() === "") {
            alert("Informe o material do produto.");
            return;
        }

        if (descricao.trim() === "") {
            alert("Informe a descrição do produto.");
            return;
        }

        if (imagens.length === 0) {
            alert(
                "Selecione pelo menos uma imagem."
            );

            return;
        }

        const imagensConvertidas =
            await Promise.all(
                imagens.map(
                    converterImagemParaDataURL
                )
            );

        const novoProduto = {
            nome: nome.trim(),

            preco: Number(preco),

            emPromocao,

            precoPromocional: emPromocao
                ? Number(precoPromocional)
                : null,

            categoria,

            publico,

            tamanhos:
                tamanhosSelecionados,

            cores,

            faixaEtaria:
                faixaEtaria.trim(),

            material:
                material.trim(),

            descricao:
                descricao.trim(),

            imagens:
                imagensConvertidas,

            imagem:
                imagensConvertidas[0] || ""
        };

        adicionarProduto(novoProduto);

        alert(
            "Produto cadastrado com sucesso!"
        );

        navigate(
            "/gerenciar-produtos"
        );
    }

    function converterImagemParaDataURL(
        arquivo
    ) {
        return new Promise(
            (resolve, reject) => {
                const reader =
                    new FileReader();

                reader.onload = (event) => {
                    const imagem =
                        new Image();

                    imagem.onload = () => {
                        const canvas =
                            document.createElement(
                                "canvas"
                            );

                        const larguraMaxima =
                            800;

                        let largura =
                            imagem.width;

                        let altura =
                            imagem.height;

                        if (
                            largura >
                            larguraMaxima
                        ) {
                            altura =
                                altura *
                                (
                                    larguraMaxima /
                                    largura
                                );

                            largura =
                                larguraMaxima;
                        }

                        canvas.width =
                            largura;

                        canvas.height =
                            altura;

                        const contexto =
                            canvas.getContext(
                                "2d"
                            );

                        contexto.drawImage(
                            imagem,
                            0,
                            0,
                            largura,
                            altura
                        );

                        const imagemComprimida =
                            canvas.toDataURL(
                                "image/jpeg",
                                0.7
                            );

                        resolve(
                            imagemComprimida
                        );
                    };

                    imagem.onerror =
                        reject;

                    imagem.src =
                        event.target.result;
                };

                reader.onerror =
                    reject;

                reader.readAsDataURL(
                    arquivo
                );
            }
        );
    }

    return (
        <>
            <Navbar />

            <main className="cadastro-page">

                <section className="cadastro-container">

                    <div className="cadastro-header">

                        <h1>
                            Cadastrar Produto
                        </h1>

                        <p>
                            Adicione um novo produto ao catálogo da Sophie Baby Kids.
                        </p>

                    </div>

                    <form
                        className="cadastro-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label htmlFor="nome">
                                Nome do produto
                            </label>

                            <input
                                type="text"
                                id="nome"
                                placeholder="Ex: Vestido Infantil"
                                value={nome}
                                onChange={(event) =>
                                    setNome(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label htmlFor="preco">
                                    Preço original
                                </label>

                                <input
                                    type="number"
                                    id="preco"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="Ex: 79,90"
                                    value={preco}
                                    onChange={(event) =>
                                        setPreco(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="categoria">
                                    Tipo de peça
                                </label>

                                <select
                                    id="categoria"
                                    value={categoria}
                                    onChange={(event) =>
                                        setCategoria(
                                            event.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Selecione o tipo de peça
                                    </option>

                                    <option value="vestidos">
                                        Vestidos
                                    </option>

                                    <option value="conjuntos">
                                        Conjuntos
                                    </option>

                                    <option value="blusas">
                                        Blusas
                                    </option>

                                    <option value="calcas">
                                        Calças
                                    </option>

                                    <option value="shorts">
                                        Shorts
                                    </option>

                                    <option value="macacoes">
                                        Macacões
                                    </option>

                                    <option value="outras">
                                        Outras peças
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="form-group">

                            <label htmlFor="publico">
                                Público
                            </label>

                            <select
                                id="publico"
                                value={publico}
                                onChange={(event) =>
                                    setPublico(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Selecione o público
                                </option>

                                <option value="meninas">
                                    Meninas
                                </option>

                                <option value="meninos">
                                    Meninos
                                </option>

                                <option value="bebes">
                                    Bebês
                                </option>

                                <option value="unissex">
                                    Unissex
                                </option>

                            </select>

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

                                    <label htmlFor="precoPromocional">
                                        Preço promocional
                                    </label>

                                    <input
                                        type="number"
                                        id="precoPromocional"
                                        min="0.01"
                                        step="0.01"
                                        placeholder="Ex: 59,90"
                                        value={precoPromocional}
                                        onChange={(event) =>
                                            setPrecoPromocional(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <small>
                                        O preço original aparecerá riscado e o preço promocional ficará em destaque.
                                    </small>

                                </div>

                            )}

                        </div>

                        <div className="form-group">

                            <label>
                                Tamanhos disponíveis
                            </label>

                            <div className="checkbox-group">

                                {[
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
                                ].map(
                                    (tamanho) => (

                                        <label
                                            className="checkbox-option"
                                            key={tamanho}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={tamanhosSelecionados.includes(
                                                    tamanho
                                                )}
                                                onChange={() =>
                                                    alterarTamanho(
                                                        tamanho
                                                    )
                                                }
                                            />

                                            {tamanho}

                                        </label>

                                    )
                                )}

                            </div>

                        </div>

                        <div className="form-group">

                            <label>
                                Cores disponíveis
                            </label>

                            <div className="color-form">

                                <input
                                    type="text"
                                    placeholder="Nome da cor"
                                    value={nomeCor}
                                    onChange={(event) =>
                                        setNomeCor(
                                            event.target.value
                                        )
                                    }
                                />

                                <input
                                    type="color"
                                    value={codigoCor}
                                    onChange={(event) =>
                                        setCodigoCor(
                                            event.target.value
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    className="add-color-button"
                                    onClick={adicionarCor}
                                >
                                    Adicionar cor
                                </button>

                            </div>

                            <div className="selected-colors">

                                {cores.map(
                                    (cor) => (

                                        <div
                                            className="selected-color"
                                            key={cor.nome}
                                        >

                                            <span
                                                className="color-circle"
                                                style={{
                                                    backgroundColor:
                                                        cor.codigo
                                                }}
                                            />

                                            <span>
                                                {cor.nome}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removerCor(
                                                        cor.nome
                                                    )
                                                }
                                            >
                                                ×
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label htmlFor="faixaEtaria">
                                    Faixa etária
                                </label>

                                <input
                                    type="text"
                                    id="faixaEtaria"
                                    placeholder="Ex: 2 a 6 anos"
                                    value={faixaEtaria}
                                    onChange={(event) =>
                                        setFaixaEtaria(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="material">
                                    Material
                                </label>

                                <input
                                    type="text"
                                    id="material"
                                    placeholder="Ex: 100% Algodão"
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

                            <label htmlFor="descricao">
                                Descrição
                            </label>

                            <textarea
                                id="descricao"
                                rows="5"
                                placeholder="Descreva o produto..."
                                value={descricao}
                                onChange={(event) =>
                                    setDescricao(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="imagens">
                                Imagens do produto
                            </label>

                            <small>
                                Você pode selecionar várias imagens.
                            </small>

                            <input
                                ref={inputImagemRef}
                                type="file"
                                id="imagens"
                                accept="image/*"
                                multiple
                                onChange={
                                    selecionarImagens
                                }
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
                                                    src={URL.createObjectURL(
                                                        imagem
                                                    )}
                                                    alt={`Imagem ${
                                                        index + 1
                                                    } do produto`}
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

                        <div className="cadastro-actions">

                            <button
                                type="button"
                                className="cancel-cadastro-button"
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
                                className="submit-button"
                            >
                                Cadastrar Produto
                            </button>

                        </div>

                    </form>

                </section>

            </main>

            <Footer />

        </>
    );
}

export default CadastroProduto;