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

    const [categoria, setCategoria] = useState(
        produto?.categoria || ""
    );

    const [publico, setPublico] = useState(
        produto?.publico || ""
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

    const [emPromocao, setEmPromocao] = useState(
        produto?.emPromocao || false
    );

    const [precoPromocional, setPrecoPromocional] = useState(
        produto?.precoPromocional || ""
    );

    const [tamanhosSelecionados, setTamanhosSelecionados] = useState(
        produto?.tamanhos || []
    );

    const [cores, setCores] = useState(
        produto?.cores || []
    );

    const [nomeCor, setNomeCor] = useState("");

    const [codigoCor, setCodigoCor] = useState(
        "#FF97C0"
    );

    if (!produto) {
        return (
            <h1>
                Produto não encontrado.
            </h1>
        );
    }

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

        setCodigoCor(
            "#FF97C0"
        );
    }

    function removerCor(nomeDaCor) {
        setCores(
            cores.filter(
                (cor) => cor.nome !== nomeDaCor
            )
        );
    }

    async function handleAdicionarImagens(event) {
        const arquivos = Array.from(
            event.target.files
        );

        if (arquivos.length === 0) {
            return;
        }

        const novasImagens =
            await Promise.all(
                arquivos.map(
                    converterImagemParaDataURL
                )
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
                (_, imagemIndex) =>
                    imagemIndex !== index
            )
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (nome.trim() === "") {
            alert("Informe o nome do produto.");
            
            return;
        }

        if (preco === "" || Number(preco) <= 0) {
            alert("O preço deve ser maior que zero.");

            return;
        }

        if (emPromocao) {
            if (precoPromocional === "" || Number(precoPromocional) <= 0) {
                alert("Informe um preço promocional válido.");

                return;
            }

            if (Number(precoPromocional) >= Number(preco)) {
                alert("O preço promocional deve ser menor que o preço original.");

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

        if (tamanhosSelecionados.length === 0) {
            alert("Selecione pelo menos um tamanho.");

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
                publico,
                tamanhos: tamanhosSelecionados,
                cores,
                faixaEtaria: faixaEtaria.trim(),
                material: material.trim(),
                descricao: descricao.trim(),
                imagens,
                imagem: imagens[0] || ""}
        );

        alert("Produto atualizado com sucesso!");

        navigate("/gerenciar-produtos");
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

                        const larguraMaxima = 800;

                        let largura = imagem.width;

                        let altura = imagem.height;

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
                                <label>
                                    Preço original
                                </label>

                                <input
                                    type="number"
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
                                <label>
                                    Tipo de peça
                                </label>

                                <select
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
                            <label>
                                Público
                            </label>

                            <select
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
                                    <label>
                                        Preço promocional
                                    </label>

                                    <input
                                        type="number"
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
                                <label>
                                    Faixa etária
                                </label>

                                <input
                                    type="text"
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
                                <label>
                                    Material
                                </label>
                                <input
                                    type="text"
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
                            <label>
                                Descrição
                            </label>

                            <textarea
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
                            <label>
                                Imagens do produto
                            </label>

                            <small>
                                Você pode manter as imagens atuais e adicionar novas imagens.
                            </small>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={
                                    handleAdicionarImagens
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