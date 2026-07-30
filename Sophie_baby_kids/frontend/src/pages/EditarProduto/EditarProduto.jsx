import "./EditarProduto.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { IoIosClose } from "react-icons/io";

import { useProducts } from "../../context/ProductContext/ProductContext";

function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        produtos,
        editarProduto,
        buscarProdutoPorId,
        getImageUrl 
    } = useProducts();

    const [carregando, setCarregando] = useState(true);
    const [produto, setProduto] = useState(null);

    const [imagensExistentes, setImagensExistentes] = useState([]);
    const [novasImagens, setNovasImagens] = useState([]);
    const [imagensParaRemover, setImagensParaRemover] = useState([]);

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [publico, setPublico] = useState("");
    const [faixaEtaria, setFaixaEtaria] = useState("");
    const [material, setMaterial] = useState("");
    const [descricao, setDescricao] = useState("");
    const [emPromocao, setEmPromocao] = useState(false);
    const [precoPromocional, setPrecoPromocional] = useState("");
    const [tamanhosSelecionados, setTamanhosSelecionados] = useState([]);
    const [cores, setCores] = useState([]);
    const [nomeCor, setNomeCor] = useState("");
    const [codigoCor, setCodigoCor] = useState("#FF97C0");

    useEffect(() => {
        const carregarProduto = async () => {
            try {
                setCarregando(true);
                const data = await buscarProdutoPorId(id);
                setProduto(data);

                setNome(data.nome || "");
                setPreco(data.preco || "");
                setCategoria(data.categoria?.id || "");
                setPublico(data.publico || "");
                setFaixaEtaria(data.faixa_etaria || "");
                setMaterial(data.material || "");
                setDescricao(data.descricao || "");
                setEmPromocao(data.em_promocao || false);
                setPrecoPromocional(data.preco_promocional || "");
                setTamanhosSelecionados(data.tamanho?.map(t => t.id) || []);
                setCores(data.cores || []);

                if (data.imagens && data.imagens.length > 0) {
                    setImagensExistentes(data.imagens.map(img => ({
                        id: img.id,
                        url: getImageUrl(img.imagem),
                        path: img.imagem
                    })));
                }
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
                alert("Erro ao carregar produto");
            } finally {
                setCarregando(false);
            }
        };

        if (id) {
            carregarProduto();
        }
    }, [id, buscarProdutoPorId, getImageUrl]);

    function alterarTamanho(tamanhoId) {
        if (tamanhosSelecionados.includes(tamanhoId)) {
            setTamanhosSelecionados(
                tamanhosSelecionados.filter(item => item !== tamanhoId)
            );
        } else {
            setTamanhosSelecionados([...tamanhosSelecionados, tamanhoId]);
        }
    }

    function adicionarCor() {
        if (nomeCor.trim() === "") {
            alert("Informe o nome da cor.");
            return;
        }

        const corJaExiste = cores.some(
            (cor) => cor.nome.toLowerCase() === nomeCor.trim().toLowerCase()
        );

        if (corJaExiste) {
            alert("Essa cor já foi adicionada.");
            return;
        }

        const novaCor = {
            nome: nomeCor.trim(),
            codigo: codigoCor
        };

        setCores([...cores, novaCor]);
        setNomeCor("");
        setCodigoCor("#FF97C0");
    }

    function removerCor(nomeDaCor) {
        setCores(cores.filter((cor) => cor.nome !== nomeDaCor));
    }

    async function handleAdicionarImagens(event) {
        const arquivos = Array.from(event.target.files);

        if (arquivos.length === 0) {
            return;
        }

        const novasImagensConvertidas = await Promise.all(
            arquivos.map(converterImagemParaDataURL)
        );

        setNovasImagens(prev => [...prev, ...novasImagensConvertidas]);
        event.target.value = "";
    }

    function removerImagemExistente(imagemId) {
        setImagensParaRemover(prev => [...prev, imagemId]);
        setImagensExistentes(prev => prev.filter(img => img.id !== imagemId));
    }

    function removerNovaImagem(index) {
        setNovasImagens(prev => prev.filter((_, i) => i !== index));
    }

    function converterImagemParaDataURL(arquivo) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imagem = new Image();

                imagem.onload = () => {
                    const canvas = document.createElement("canvas");
                    const larguraMaxima = 800;
                    let largura = imagem.width;
                    let altura = imagem.height;

                    if (largura > larguraMaxima) {
                        altura = altura * (larguraMaxima / largura);
                        largura = larguraMaxima;
                    }

                    canvas.width = largura;
                    canvas.height = altura;
                    const contexto = canvas.getContext("2d");
                    contexto.drawImage(imagem, 0, 0, largura, altura);
                    const imagemComprimida = canvas.toDataURL("image/jpeg", 0.7);
                    resolve(imagemComprimida);
                };

                imagem.onerror = reject;
                imagem.src = event.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(arquivo);
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log("imagensExistentes:", imagensExistentes);
        console.log("novasImagens:", novasImagens);
        console.log("imagensParaRemover:", imagensParaRemover);

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

        const temImagens = imagensExistentes.length > 0 || novasImagens.length > 0;
        if (!temImagens) {
            alert("Selecione pelo menos uma imagem.");
            return;
        }

        const produtoAtualizado = new FormData();

        produtoAtualizado.append("nome", nome.trim());
        produtoAtualizado.append("preco", Number(preco));
        produtoAtualizado.append("em_promocao", emPromocao);

        if (emPromocao) {
            produtoAtualizado.append("preco_promocional", Number(precoPromocional));
        } else {
            produtoAtualizado.append("preco_promocional", "");
        }

        produtoAtualizado.append("categoria", categoria);
        produtoAtualizado.append("publico", publico);
        produtoAtualizado.append("faixa_etaria", faixaEtaria.trim());
        produtoAtualizado.append("material", material.trim());
        produtoAtualizado.append("descricao", descricao.trim());
        produtoAtualizado.append("cores", JSON.stringify(cores));

        tamanhosSelecionados.forEach((tamanho) => {
            produtoAtualizado.append("tamanho", tamanho);
        });

        for (const imagemBase64 of novasImagens) {
            const blob = await fetch(imagemBase64).then(res => res.blob());
            produtoAtualizado.append("imagens", blob, `imagem_${Date.now()}.jpg`);
        }

        if (imagensParaRemover.length > 0) {
            console.log("Enviando imagens_remover:", JSON.stringify(imagensParaRemover));
            produtoAtualizado.append("imagens_remover", JSON.stringify(imagensParaRemover));
        } else {
            console.log("Nenhuma imagem para remover");
        }

        try {
            await editarProduto(Number(id), produtoAtualizado);
            alert("Produto atualizado com sucesso!");
            navigate("/gerenciar-produtos");
        } catch (erro) {
            console.error("Erro ao atualizar produto:", erro);
            alert("Não foi possível atualizar o produto.");
        }
    }

    if (carregando) {
        return (
            <>
                <Navbar />
                <main className="editar-page">
                    <div className="editar-container">
                        <div className="loading-spinner">
                            <p>Carregando produto...</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!produto) {
        return (
            <>
                <Navbar />
                <main className="editar-page">
                    <div className="editar-container">
                        <h1>Produto não encontrado.</h1>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="editar-page">
                <section className="editar-container">
                    <div className="editar-header">
                        <h1>Editar Produto</h1>
                        <p>Atualize as informações do produto.</p>
                    </div>

                    <form className="editar-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nome do produto</label>
                            <input
                                type="text"
                                placeholder="Ex: Vestido Infantil"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Preço original</label>
                                <input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="Ex: 79,90"
                                    value={preco}
                                    onChange={(event) => setPreco(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Tipo de peça</label>
                                <select
                                    value={categoria}
                                    onChange={(event) => setCategoria(event.target.value)}
                                >
                                    <option value="">Selecione o tipo de peça</option>
                                    <option value="3">Vestidos</option>
                                    <option value="4">Conjuntos</option>
                                    <option value="5">Blusas</option>
                                    <option value="6">Calças</option>
                                    <option value="7">Shorts</option>
                                    <option value="8">Macacões</option>
                                    <option value="9">Outras peças</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Público</label>
                            <select
                                value={publico}
                                onChange={(event) => setPublico(event.target.value)}
                            >
                                <option value="">Selecione o público</option>
                                <option value="F">Meninas</option>
                                <option value="M">Meninos</option>
                                <option value="B">Bebês</option>
                                <option value="U">Unissex</option>
                            </select>
                        </div>

                        <div className="promotion-box">
                            <label className="promotion-checkbox">
                                <input
                                    type="checkbox"
                                    checked={emPromocao}
                                    onChange={(event) => setEmPromocao(event.target.checked)}
                                />
                                <span>Produto em promoção</span>
                            </label>

                            {emPromocao && (
                                <div className="promotion-price">
                                    <label>Preço promocional</label>
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        placeholder="Ex: 59,90"
                                        value={precoPromocional}
                                        onChange={(event) => setPrecoPromocional(event.target.value)}
                                    />
                                    <small>
                                        O preço original aparecerá riscado e o preço promocional ficará em destaque.
                                    </small>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Tamanhos disponíveis</label>
                            <div className="checkbox-group">
                                {[
                                    { id: 1, nome: "RN" },
                                    { id: 2, nome: "P" },
                                    { id: 3, nome: "M" },
                                    { id: 4, nome: "G" },
                                    { id: 5, nome: "GG" },
                                    { id: 6, nome: "1" },
                                    { id: 7, nome: "2" },
                                    { id: 8, nome: "3" },
                                    { id: 9, nome: "4" },
                                    { id: 10, nome: "6" },
                                    { id: 11, nome: "8" },
                                    { id: 12, nome: "10" },
                                    { id: 13, nome: "12" },
                                    { id: 14, nome: "14" },
                                    { id: 15, nome: "16" }
                                ].map((tamanho) => (
                                    <label className="checkbox-option" key={tamanho.id}>
                                        <input
                                            type="checkbox"
                                            checked={tamanhosSelecionados.includes(tamanho.id)}
                                            onChange={() => alterarTamanho(tamanho.id)}
                                        />
                                        {tamanho.nome}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Cores disponíveis</label>
                            <div className="color-form">
                                <input
                                    type="text"
                                    placeholder="Nome da cor"
                                    value={nomeCor}
                                    onChange={(event) => setNomeCor(event.target.value)}
                                />
                                <input
                                    type="color"
                                    value={codigoCor}
                                    onChange={(event) => setCodigoCor(event.target.value)}
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
                                {cores.map((cor) => (
                                    <div className="selected-color" key={cor.nome}>
                                        <span
                                            className="color-circle"
                                            style={{ backgroundColor: cor.codigo }}
                                        />
                                        <span>{cor.nome}</span>
                                        <button type="button" onClick={() => removerCor(cor.nome)}>
                                            <IoIosClose />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Faixa etária</label>
                                <input
                                    type="text"
                                    placeholder="Ex: 2 a 6 anos"
                                    value={faixaEtaria}
                                    onChange={(event) => setFaixaEtaria(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Material</label>
                                <input
                                    type="text"
                                    placeholder="Ex: 100% Algodão"
                                    value={material}
                                    onChange={(event) => setMaterial(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea
                                rows="5"
                                placeholder="Descreva o produto..."
                                value={descricao}
                                onChange={(event) => setDescricao(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Imagens do produto</label>
                            <small>
                                Você pode manter as imagens atuais e adicionar novas imagens.
                            </small>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleAdicionarImagens}
                            />

                            {imagensExistentes.length > 0 && (
                                <div className="image-section">
                                    <h4>Imagens atuais</h4>
                                    <div className="image-preview-grid">
                                        {imagensExistentes.map((imagem) => (
                                            <div className="image-preview" key={imagem.id}>
                                                <img src={imagem.url} alt={`Imagem ${imagem.id}`} />
                                                <button
                                                    type="button"
                                                    className="remove-image-btn"
                                                    onClick={() => removerImagemExistente(imagem.id)}
                                                >
                                                    <IoIosClose />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {novasImagens.length > 0 && (
                                <div className="image-section">
                                    <h4>Novas imagens</h4>
                                    <div className="image-preview-grid">
                                        {novasImagens.map((imagem, index) => (
                                            <div className="image-preview" key={`nova-${index}`}>
                                                <img src={imagem} alt={`Nova imagem ${index + 1}`} />
                                                <button
                                                    type="button"
                                                    className="remove-image-btn"
                                                    onClick={() => removerNovaImagem(index)}
                                                >
                                                    <IoIosClose />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {imagensExistentes.length === 0 && novasImagens.length === 0 && (
                                <div className="no-images-message">
                                    <p>Nenhuma imagem adicionada. Selecione pelo menos uma imagem.</p>
                                </div>
                            )}
                        </div>

                        <div className="editar-actions">
                            <button
                                type="button"
                                className="cancel-edit-button"
                                onClick={() => navigate("/gerenciar-produtos")}
                            >
                                Cancelar
                            </button>

                            <button type="submit" className="save-edit-button">
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