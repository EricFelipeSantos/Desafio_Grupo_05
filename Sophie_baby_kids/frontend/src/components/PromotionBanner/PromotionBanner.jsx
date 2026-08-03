import "./PromotionBanner.css";

import { useEffect, useState } from "react";

import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace('/api', '')
    : "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api/banners/`;

function PromotionBanner() {
    const [banners, setBanners] = useState([]);
    const [bannerAtual, setBannerAtual] = useState(0);

    useEffect(() => {
        async function buscarBanners() {
            try {
                const resposta = await fetch(API_URL);
                if (!resposta.ok) return;
                const dados = await resposta.json();
                setBanners(Array.isArray(dados) ? dados : dados.results || []);
            } catch (erro) {
                console.error("Erro ao carregar banners:", erro);
            }
        }

        buscarBanners();
    }, []);

    useEffect(() => {
        if (banners.length > 1) {
            const interval = setInterval(() => {
                setBannerAtual((atual) =>
                    atual === banners.length - 1 ? 0 : atual + 1
                );
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [banners]);

    function bannerAnterior() {
        setBannerAtual((atual) =>
            atual === 0 ? banners.length - 1 : atual - 1
        );
    }

    function proximoBanner() {
        setBannerAtual((atual) =>
            atual === banners.length - 1 ? 0 : atual + 1
        );
    }

    function irParaBanner(index) {
        setBannerAtual(index);
    }

    if (banners.length === 0) {
        return null;
    }

    return (
        <section className="promotion-banner">
            {banners.length > 1 && (
                <>
                    <button className="arrow arrow-left" onClick={bannerAnterior}>
                        <HiChevronLeft />
                    </button>

                    <button className="arrow arrow-right" onClick={proximoBanner}>
                        <HiChevronRight />
                    </button>

                    <div className="banner-dots">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === bannerAtual ? "active" : ""}`}
                                onClick={() => irParaBanner(index)}
                            />
                        ))}
                    </div>
                </>
            )}

            <img
                src={banners[bannerAtual].imagem}
                alt="Banner promocional"
                className="promotion-image"
            />
        </section>
    );
}

export default PromotionBanner;