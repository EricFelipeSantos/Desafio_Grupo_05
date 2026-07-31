import "./CadastroProduto.css";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { IoIosClose } from "react-icons/io";

import formatPrice from "../../utils/FormatPrice"
import { useProducts } from "../../context/ProductContext/ProductContext";

// lista de cores fixas
const coresFixas = [
    { nome: "Branco", codigo: "#FFFFFF" },
    { nome: "Off White", codigo: "#FAF9F6" },
    { nome: "Preto", codigo: "#000000" },
    { nome: "Cinza", codigo: "#808080" },
    { nome: "Rosa", codigo: "#FFB6C1" },
    { nome: "Pink", codigo: "#FF69B4" },
    { nome: "Lilás", codigo: "#C8A2C8" },
    { nome: "Roxo", codigo: "#800080" },
    { nome: "Coral", codigo: "#FF7F50" },
    { nome: "Colorido", codigo: "#FF1493" },
    { nome: "Azul Marinho", codigo: "#000080" },
    { nome: "Azul", codigo: "#0000FF" },
    { nome: "Azul Claro", codigo: "#ADD8E6" },
    { nome: "Verde", codigo: "#008000" },
    { nome: "Verde Água", codigo: "#00FFFF" },
    { nome: "Verde Lima", codigo: "#32CD32" },
    { nome: "Amarelo", codigo: "#FFFF00" },
    { nome: "Laranja", codigo: "#FFA500" },
    { nome: "Vermelho", codigo: "#FF0000" },
    { nome: "Marrom", codigo: "#8B4513" }
];

function CadastroProduto() {
    const navigate = useNavigate();
    
    // campos principais do produto
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [precoPix, setPrecoPix] = useState(""); 
    const [precoBoleto, setPrecoBoleto] = useState("");
    const [parcelas, setParcelas] = useState("10");
    const [jurosParcelas, setJurosParcelas] = useState("");
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

    function toggleCor(cor) {
        if (cores.some(c => c.nome === cor.nome)) {
            setCores(cores.filter(c => c.nome !== cor.nome));
        } else {
            setCores([...cores, cor]);
        }
    }

    function removerCor(nomeDaCor) {
        setCores(
            cores.filter(
                (cor) => cor.nome !== nomeDaCor
            )
        );
    }

    function selecionarImagens(event) {
        const arquivosSelecionados = Array.from(event.target.files);

        setImagens(
            (imagensAtuais) => [
                ...imagensAtuais,
                ...arquivosSelecionados
            ]
        );
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

    // calcula 5% de desconto se os campos estiverem em branco
    const calcularPrecoComDesconto = (precoBase) => {
        if (!precoBase || isNaN(Number(precoBase))) return "";
        return (Number(precoBase) * 0.95).toFixed(2);
    };

    const precoPixFinal = precoPix || calcularPrecoComDesconto(preco);
    const precoBoletoFinal = precoBoleto || calcularPrecoComDesconto(preco);

    async function handleSubmit(event) {
        event.preventDefault();

        // validações
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
            alert("Selecione pelo menos uma cor.");
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
            alert("Selecione pelo menos uma imagem.");
            return;
        }

        const novoProduto = new FormData();

        // campos que vão para o banco
        novoProduto.append("nome", nome.trim());
        novoProduto.append("preco", Number(preco));
        novoProduto.append("preco_pix", Number(precoPixFinal) || 0);
        novoProduto.append("preco_boleto", Number(precoBoletoFinal) || 0);
        novoProduto.append("parcelas", String(parcelas));
        novoProduto.append("juros_parcelas", Number(jurosParcelas) || 0);
        novoProduto.append("em_promocao", emPromocao);

        if (emPromocao) {
            novoProduto.append("preco_promocional", Number(precoPromocional));
        }

        novoProduto.append("categoria", categoria);
        novoProduto.append("publico", publico);
        novoProduto.append("faixa_etaria", faixaEtaria.trim());
        novoProduto.append("material", material.trim());
        novoProduto.append("descricao", descricao.trim());
        novoProduto.append("cores", JSON.stringify(cores));

        tamanhosSelecionados.forEach((tamanho) => {
                novoProduto.append("tamanho", tamanho);
            }
        );

        imagens.forEach((imagem) => {
                novoProduto.append("imagens", imagem);
            }
        );

        for (const campo of novoProduto.entries()) {
            console.log(campo[0], campo[1]);
        }

        try {
            await adicionarProduto(novoProduto);
            alert("Produto cadastrado com sucesso!");
            navigate("/gerenciar-produtos");

        } catch (erro) {
            alert("Não foi possível cadastrar o produto.");
        }
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
                                onChange={(event) => setNome(event.target.value)}
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
                                    onChange={(event) => setPreco(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="categoria">
                                    Tipo de peça
                                </label>

                                <select
                                    id="categoria"
                                    value={categoria}
                                    onChange={(event) => setCategoria(event.target.value)}
                                >

                                    <option value="">
                                        Selecione o tipo de peça
                                    </option>

                                    <option value="1">
                                        Vestidos
                                    </option>

                                    <option value="2">
                                        Conjuntos
                                    </option>

                                    <option value="3">
                                        Blusas
                                    </option>

                                    <option value="4">
                                        Calças
                                    </option>

                                    <option value="5">
                                        Shorts
                                    </option>

                                    <option value="6">
                                        Macacões
                                    </option>

                                    <option value="7">
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
                                onChange={(event) => setPublico(event.target.value)}
                            >

                                <option value="">
                                    Selecione o público
                                </option>

                                <option value="F">
                                    Meninas
                                </option>

                                <option value="M">
                                    Meninos
                                </option>

                                <option value="B">
                                    Bebês
                                </option>

                                <option value="U">
                                    Unissex
                                </option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="precoPix">
                                    Preço no PIX
                                </label>
                                <input
                                    type="number"
                                    id="precoPix"
                                    step="0.01"
                                    min="0.01"
                                    placeholder="R$ 94,90"
                                    value={precoPix}
                                    onChange={(e) => setPrecoPix(e.target.value)}
                                />
                                <small>Deixe em branco para calcular 5% de desconto</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="precoBoleto">
                                    Preço no Boleto
                                </label>
                                <input
                                    type="number"
                                    id="precoBoleto"
                                    step="0.01"
                                    min="0.01"
                                    placeholder="R$ 94,90"
                                    value={precoBoleto}
                                    onChange={(e) => setPrecoBoleto(e.target.value)}
                                />
                                <small>Deixe em branco para calcular 5% de desconto</small>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="parcelas">
                                Parcelas no cartão
                            </label>
                            <select
                                id="parcelas"
                                value={parcelas}
                                onChange={(e) => setParcelas(e.target.value)}
                            >
                                <option value="1">1x</option>
                                <option value="2">2x</option>
                                <option value="3">3x</option>
                                <option value="4">4x</option>
                                <option value="5">5x</option>
                                <option value="6">6x</option>
                                <option value="7">7x</option>
                                <option value="8">8x</option>
                                <option value="9">9x</option>
                                <option value="10">10x</option>
                                <option value="11">11x</option>
                                <option value="12">12x</option>
                            </select>
                            <small>
                                Valor da parcela: {formatPrice(Number(preco || 0) / Number(parcelas || 1))}
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Juros por parcela (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder="0"
                                value={jurosParcelas}
                                onChange={(e) => setJurosParcelas(e.target.value)}
                            />
                            <small>Deixe em branco para parcelas sem juros</small>
                        </div>

                        <div className="promotion-box">
                            <label className="promotion-checkbox">
                                <input
                                    type="checkbox"
                                    checked={emPromocao}
                                    onChange={(event) => setEmPromocao(event.target.checked)}
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
                                        onChange={(event) => setPrecoPromocional(event.target.value)}
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
                                    { id: 15, nome: "16" },
                                ].map(
                                    (tamanho) => (
                                        <label
                                            className="checkbox-option"
                                            key={tamanho.id}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={tamanhosSelecionados.includes(tamanho.id)}
                                                onChange={() => alterarTamanho(tamanho.id)}
                                            />
                                            {tamanho.nome}
                                        </label>
                                    )
                                )}
                            </div>
                        </div>

                        {/* cores fixas */}
                        <div className="form-group">
                            <label>Cores disponíveis</label>
                            <div className="cores-fixas-grid">
                                {coresFixas.map((cor) => (
                                    <button
                                        key={cor.nome}
                                        type="button"
                                        className={`cor-fixa ${cores.some(c => c.nome === cor.nome) ? "selected" : ""} ${cor.nome === "Colorido" ? "colorido" : ""}`}
                                        style={cor.nome === "Colorido" ? {} : { backgroundColor: cor.codigo }}
                                        title={cor.nome}
                                        onClick={() => toggleCor(cor)}
                                    />
                                ))}
                            </div>
                            <small>Clique nas cores para adicionar ou remover</small>

                            {cores.length > 0 && (
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
                            )}
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
                                    onChange={(event) => setFaixaEtaria(event.target.value)}
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
                                    onChange={(event) => setMaterial(event.target.value)}
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
                                onChange={(event) => setDescricao(event.target.value)}
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
                                onChange={selecionarImagens}
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
                                                    src={URL.createObjectURL(imagem)}
                                                    alt={`Imagem ${index + 1} do produto`}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removerImagem(index)}
                                                >
                                                    <IoIosClose />
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
                                onClick={() => navigate("/gerenciar-produtos")}
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