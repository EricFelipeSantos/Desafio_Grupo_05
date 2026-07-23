import "../PromotionBanner/PromotionBanner.css";

import { useEffect, useState } from "react";

import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

function PromotionBanner() {
    const [banners, setBanners] = useState([]);

    const [bannerAtual, setBannerAtual] = useState(0);

    useEffect(() => {
        const bannersSalvos = localStorage.getItem("banners");

        if (bannersSalvos) {
            setBanners(
                JSON.parse(
                    bannersSalvos
                )
            );

        }

    }, []);

    function bannerAnterior() {
        setBannerAtual(
            (indiceAtual) =>
                indiceAtual === 0
                    ? banners.length - 1
                    : indiceAtual - 1
        );

    }

    function proximoBanner() {
        setBannerAtual(
            (indiceAtual) =>
                indiceAtual ===
                banners.length - 1
                    ? 0
                    : indiceAtual + 1
        );

    }

    if (banners.length === 0) {
        return null;
    }

    return (
        <section className="promotion-banner">
            {banners.length > 1 && (
                <button
                    className="arrow arrow-left"
                    onClick={
                        bannerAnterior
                    }
                >
                    <HiChevronLeft />
                </button>

            )}

            <img
                src={
                    banners[
                        bannerAtual
                    ].imagem
                }
                alt="Banner promocional"
                className="promotion-image"
            />

            {banners.length > 1 && (
                <button
                    className="arrow arrow-right"
                    onClick={
                        proximoBanner
                    }
                >
                    <HiChevronRight />
                </button>
            )}
        </section>
    );
}

export default PromotionBanner;