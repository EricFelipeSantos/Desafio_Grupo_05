import { createContext, useContext, useEffect, useState } from "react";

import produtosIniciais from "../../data/produtos_temporario";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [produtos, setProdutos] = useState(() => {
        const produtosSalvos = localStorage.getItem("produtos");

        return produtosSalvos
            ? JSON.parse(produtosSalvos)
            : produtosIniciais;
    });

    useEffect(() => {
        localStorage.setItem(
            "produtos",
            JSON.stringify(produtos)
        );
    }, [produtos]);

    function adicionarProduto(novoProduto) {
        const produtoComId = {
            ...novoProduto,
            id: Date.now()
        };

        setProdutos((produtosAtuais) => [
            ...produtosAtuais,
            produtoComId
        ]);
    }

    function editarProduto(id, produtoAtualizado) {
        setProdutos((produtosAtuais) =>
            produtosAtuais.map((produto) =>
                produto.id === id
                    ? {
                        ...produto,
                        ...produtoAtualizado
                    }
                    : produto
            )
        );
    }

    function excluirProduto(id) {
        setProdutos((produtosAtuais) =>
            produtosAtuais.filter(
                (produto) => produto.id !== id
            )
        );
    }

    return (
        <ProductContext.Provider
            value={{
                produtos,
                adicionarProduto,
                editarProduto,
                excluirProduto
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    return useContext(ProductContext);
}