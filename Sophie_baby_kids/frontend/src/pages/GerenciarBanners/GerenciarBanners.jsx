import "./GerenciarBanners.css";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function GerenciarBanners() {
    const navigate = useNavigate();

    const [banners, setBanners] = useState(() => {
        const bannersSalvos = localStorage.getItem("banners");

        return bannersSalvos
            ? JSON.parse(bannersSalvos)
            : [];
    });

    const [imagemSelecionada, setImagemSelecionada] =
        useState(null);

    const inputImagemRef = useRef(null);

    function converterImagemParaDataURL(arquivo) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;

            reader.readAsDataURL(arquivo);
        });
    }

    async function adicionarBanner(event) {
        event.preventDefault();

        if (!imagemSelecionada) {
            alert("Selecione uma imagem para o banner.");
            return;
        }

        const imagemConvertida =
            await converterImagemParaDataURL(
                imagemSelecionada
            );

        const novoBanner = {
            id: Date.now(),
            imagem: imagemConvertida
        };

        const novosBanners = [
            ...banners,
            novoBanner
        ];

        setBanners(novosBanners);

        localStorage.setItem(
            "banners",
            JSON.stringify(novosBanners)
        );

        setImagemSelecionada(null);

        if (inputImagemRef.current) {
            inputImagemRef.current.value = "";
        }

        alert("Banner adicionado com sucesso!");
    }

    function removerBanner(id) {
        const confirmar =
            window.confirm(
                "Deseja realmente remover este banner?"
            );

        if (!confirmar) {
            return;
        }

        const novosBanners =
            banners.filter(
                (banner) =>
                    banner.id !== id
            );

        setBanners(novosBanners);

        localStorage.setItem(
            "banners",
            JSON.stringify(novosBanners)
        );
    }

    function selecionarImagem(event) {
        const arquivo =
            event.target.files[0];

        if (arquivo) {
            setImagemSelecionada(arquivo);
        }
    }

    return (
        <>
            <Navbar />

            <main className="gerenciar-banners-page">
                <section className="gerenciar-banners-container">
                    <div className="gerenciar-banners-header">
                        <h1>
                            Gerenciar Banners
                        </h1>

                        <p>
                            Adicione ou remova os banners promocionais exibidos na página inicial.
                        </p>
                    </div>

                    <form
                        className="banner-form"
                        onSubmit={adicionarBanner}
                    >
                        <div className="form-group">
                            <label htmlFor="banner">
                                Imagem do banner
                            </label>

                            <input
                                ref={inputImagemRef}
                                type="file"
                                id="banner"
                                accept="image/*"
                                onChange={
                                    selecionarImagem
                                }
                            />

                            <small>
                                Escolha uma imagem para adicionar aos banners promocionais.
                            </small>
                        </div>

                        {imagemSelecionada && (
                            <div className="banner-preview">
                                <img
                                    src={
                                        URL.createObjectURL(
                                            imagemSelecionada
                                        )
                                    }
                                    alt="Pré-visualização do banner"
                                />

                            </div>

                        )}

                        <button
                            type="submit"
                            className="add-banner-button"
                        >
                            Adicionar Banner
                        </button>
                    </form>

                    <section className="banners-list-section">
                        <h2>
                            Banners cadastrados
                        </h2>

                        {banners.length === 0 ? (
                            <div className="no-banners">
                                <p>
                                    Nenhum banner cadastrado.
                                </p>
                            </div>

                        ) : (
                            <div className="banners-grid">
                                {banners.map(
                                    (banner) => (
                                        <article
                                            className="banner-card"
                                            key={
                                                banner.id
                                            }
                                        >

                                            <img
                                                src={
                                                    banner.imagem
                                                }
                                                alt="Banner promocional"
                                            />

                                            <button
                                                type="button"
                                                className="remove-banner-button"
                                                onClick={() =>
                                                    removerBanner(
                                                        banner.id
                                                    )
                                                }
                                            >
                                                Remover banner
                                            </button>
                                        </article>
                                    )
                                )}
                            </div>
                        )}
                    </section>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() =>
                            navigate(
                                "/gerenciar-produtos"
                            )
                        }
                    >
                        Voltar
                    </button>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default GerenciarBanners;