import "./GerenciarBanners.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { FaPlus, FaTrash, FaArrowLeft, FaImage } from "react-icons/fa";

import { comprimirImagem } from "../../utils/comprimirImagem";

const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace('/api', '')
    : "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api/banners/`;

function getHeaders(isFormData = false) {
    const token = localStorage.getItem("access_token");
    const headers = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }
    return headers;
}

function GerenciarBanners() {
    const navigate = useNavigate();

    const [banners, setBanners] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [enviando, setEnviando] = useState(false);

    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const inputImagemRef = useRef(null);

    async function buscarBanners() {
        try {
            setCarregando(true);
            const resposta = await fetch(API_URL);
            if (!resposta.ok) {
                throw new Error(`Erro ao buscar banners: ${resposta.status}`);
            }
            const dados = await resposta.json();
            setBanners(Array.isArray(dados) ? dados : dados.results || []);
        } catch (erro) {
            console.error("Erro ao carregar banners:", erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarBanners();
    }, []);

    async function selecionarImagem(event) {
        const arquivo = event.target.files[0];

        if (arquivo) {
            const arquivoComprimido = await comprimirImagem(arquivo, 1400, 0.8);
            setImagemSelecionada(arquivoComprimido);
            setPreviewUrl(URL.createObjectURL(arquivoComprimido));
        }
    }

    async function adicionarBanner(event) {
        event.preventDefault();

        if (!imagemSelecionada) {
            alert("Selecione uma imagem para o banner.");
            return;
        }

        setEnviando(true);

        try {
            const formData = new FormData();
            formData.append("imagem", imagemSelecionada);
            formData.append("ordem", banners.length);

            const resposta = await fetch(API_URL, {
                method: "POST",
                body: formData,
                headers: getHeaders(true)
            });

            if (!resposta.ok) {
                const texto = await resposta.text();
                throw new Error(texto || "Erro ao cadastrar banner.");
            }

            await buscarBanners();

            setImagemSelecionada(null);
            setPreviewUrl(null);

            if (inputImagemRef.current) {
                inputImagemRef.current.value = "";
            }

            alert("Banner adicionado com sucesso!");
        } catch (erro) {
            console.error("Erro ao adicionar banner:", erro);
            alert("Não foi possível adicionar o banner.");
        } finally {
            setEnviando(false);
        }
    }

    async function removerBanner(id) {
        const confirmar = window.confirm("Deseja realmente remover este banner?");

        if (!confirmar) return;

        try {
            const resposta = await fetch(`${API_URL}${id}/`, {
                method: "DELETE",
                headers: getHeaders()
            });

            if (!resposta.ok) {
                throw new Error(`Erro ao remover banner: ${resposta.status}`);
            }

            setBanners((atuais) => atuais.filter((banner) => banner.id !== id));
        } catch (erro) {
            console.error("Erro ao remover banner:", erro);
            alert("Não foi possível remover o banner.");
        }
    }

    return (
        <>
            <Navbar />

            <main className="gerenciar-banners-page">
                <section className="gerenciar-banners-container">
                    <div className="gerenciar-banners-header">
                        <h1>
                            <FaImage /> Gerenciar Banners
                        </h1>
                        <p>Adicione ou remova os banners promocionais exibidos na página inicial.</p>
                    </div>

                    <form className="banner-form" onSubmit={adicionarBanner}>
                        <div className="form-group">
                            <label htmlFor="banner">Imagem do banner</label>

                            <div className="file-input-wrapper">
                                <input
                                    ref={inputImagemRef}
                                    type="file"
                                    id="banner"
                                    accept="image/*"
                                    onChange={selecionarImagem}
                                />
                                <span className="file-input-label">
                                    {imagemSelecionada ? imagemSelecionada.name : "Clique para selecionar uma imagem"}
                                </span>
                            </div>

                            <small>Escolha uma imagem para adicionar aos banners promocionais.</small>
                        </div>

                        {previewUrl && (
                            <div className="banner-preview">
                                <img src={previewUrl} alt="Pré-visualização do banner" />
                                <span className="preview-label">Pré-visualização</span>
                            </div>
                        )}

                        <button type="submit" className="add-banner-button" disabled={enviando}>
                            <FaPlus /> {enviando ? "Enviando..." : "Adicionar Banner"}
                        </button>
                    </form>

                    <section className="banners-list-section">
                        <h2>Banners cadastrados</h2>

                        {carregando ? (
                            <p>Carregando banners...</p>
                        ) : banners.length === 0 ? (
                            <div className="no-banners">
                                <p>Nenhum banner cadastrado.</p>
                            </div>
                        ) : (
                            <div className="banners-grid">
                                {banners.map((banner) => (
                                    <article className="banner-card" key={banner.id}>
                                        <img src={banner.imagem} alt="Banner promocional" />

                                        <button
                                            type="button"
                                            className="remove-banner-button"
                                            onClick={() => removerBanner(banner.id)}
                                        >
                                            <FaTrash /> Remover banner
                                        </button>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/dashboard")}
                    >
                        <FaArrowLeft /> Voltar ao Dashboard
                    </button>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default GerenciarBanners;