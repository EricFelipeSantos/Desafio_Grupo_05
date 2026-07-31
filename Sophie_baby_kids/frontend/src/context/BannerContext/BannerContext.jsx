import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import bannerInicial from "../../assets/bannerPromocional.png";

const BannerContext = createContext();

export function BannerProvider({ children }) {

    const [banner, setBanner] = useState(() => {

        const bannerSalvo =
            localStorage.getItem("bannerPromocional");

        return bannerSalvo
            ? JSON.parse(bannerSalvo)
            : {
                imagem: bannerInicial,
                titulo: "Promoção especial",
                descricao: "Confira nossas ofertas!"
            };
    });

    useEffect(() => {

        localStorage.setItem(
            "bannerPromocional",
            JSON.stringify(banner)
        );

    }, [banner]);

    function atualizarBanner(novoBanner) {

        setBanner((bannerAtual) => ({
            ...bannerAtual,
            ...novoBanner
        }));

    }

    return (
        <BannerContext.Provider
            value={{
                banner,
                atualizarBanner
            }}
        >
            {children}
        </BannerContext.Provider>
    );
}

export function useBanner() {
    return useContext(BannerContext);
}