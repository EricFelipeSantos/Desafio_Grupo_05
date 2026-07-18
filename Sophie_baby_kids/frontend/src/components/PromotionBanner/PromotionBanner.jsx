import "../PromotionBanner/PromotionBanner.css"

import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import BannerPromocional from "../../assets/bannerPromocional.png"

function PromotionBanner() {
    return (
        <section className="promotion-banner">
            <button className="arrow">
                <HiChevronLeft />
            </button>

            <img 
                src={BannerPromocional}
                alt="Banner promocional"
                className="promotion-image"
            />

            <button className="arrow">
                <HiChevronRight />
            </button>
        </section>
    )
}

export default PromotionBanner
