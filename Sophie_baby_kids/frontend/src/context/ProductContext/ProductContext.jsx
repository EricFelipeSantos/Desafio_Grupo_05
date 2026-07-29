import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const ProductContext = createContext();

const API_URL = "http://127.0.0.1:8000/api/produtos/";

export function ProductProvider({ children }) {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const getImageUrl = (imagemPath) => {
        if (!imagemPath) return null;
        if (imagemPath.startsWith('http')) return imagemPath;
        return `http://127.0.0.1:8000/media/${imagemPath}`;
    };

    const getToken = () => {
        return localStorage.getItem("access_token");
    };

    const getHeaders = (isFormData = false) => {
        const token = getToken();
        const headers = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }
        return headers;
    };

    async function buscarProdutos() {
        try {
            setCarregando(true);
            setErro(null);

            const resposta = await fetch(API_URL);

            if (!resposta.ok) {
                throw new Error(`Erro ao buscar produtos: ${resposta.status}`);
            }

            const dados = await resposta.json();

            setProdutos(dados);

        } catch (erro) {
            console.error("Erro ao carregar produtos:", erro);
            setErro("Não foi possível carregar os produtos.");

        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []);

    async function buscarProdutoPorId(id) {
        try {
            const resposta = await fetch(`${API_URL}${id}/`);

            if (!resposta.ok) {
                throw new Error(`Erro ao buscar produto: ${resposta.status}`);
            }

            const dados = await resposta.json();
            return dados;

        } catch (erro) {
            console.error("Erro ao buscar produto por ID:", erro);
            throw erro;
        }
    }

    async function adicionarProduto(novoProduto) {
        try {
            const resposta = await fetch(API_URL, {
                method: "POST",
                body: novoProduto,
                headers: getHeaders(true)
            });

            const textoResposta = await resposta.text();

            console.log("Status da resposta:", resposta.status);
            console.log("Resposta da API:", textoResposta);

            if (!resposta.ok) {
                throw new Error(textoResposta || "Erro ao cadastrar produto.");
            }

            const dados = JSON.parse(textoResposta);

            const produtoCompleto = await buscarProdutoPorId(dados.id);

            setProdutos((produtosAtuais) => [...produtosAtuais, produtoCompleto]);

            return produtoCompleto;

        } catch (erro) {
            console.error("Erro ao adicionar produto:", erro);
            throw erro;
        }
    }

    async function editarProduto(id, produtoAtualizado) {
        try {
            const resposta = await fetch(`${API_URL}${id}/`, {
                method: "PUT", 
                body: produtoAtualizado,
                headers: getHeaders(true)
            });

            const textoResposta = await resposta.text();

            console.log("Status da resposta:", resposta.status);
            console.log("Resposta da API:", textoResposta);

            if (!resposta.ok) {
                throw new Error(textoResposta || "Erro ao editar produto.");
            }

            const dados = JSON.parse(textoResposta);

            const produtoCompleto = await buscarProdutoPorId(dados.id);

            setProdutos(
                (produtosAtuais) =>
                    produtosAtuais.map(
                        (produto) =>
                            produto.id === id
                                ? produtoCompleto
                                : produto
                    )
            );

            return produtoCompleto;

        } catch (erro) {
            console.error("Erro ao editar produto:", erro);
            throw erro;
        }
    }

    async function excluirProduto(id) {
        try {
            const resposta = await fetch(`${API_URL}${id}/`, {
                method: "DELETE",
                headers: getHeaders()
            });

            if (!resposta.ok) {
                throw new Error(`Erro ao excluir produto: ${resposta.status}`);
            }

            setProdutos(
                (produtosAtuais) =>
                    produtosAtuais.filter(
                        (produto) => produto.id !== id
                    )
            );

        } catch (erro) {
            console.error("Erro ao excluir produto:", erro);
            throw erro;
        }
    }

    return (
        <ProductContext.Provider
            value={{
                produtos,
                carregando,
                erro,
                buscarProdutos,
                buscarProdutoPorId,
                adicionarProduto,
                editarProduto,
                excluirProduto,
                getImageUrl
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}