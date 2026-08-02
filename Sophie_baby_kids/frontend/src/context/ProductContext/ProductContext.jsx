import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const ProductContext = createContext();

const BASE_URL = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace('/api', '') 
    : "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api/produtos/`;

export function ProductProvider({ children }) {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const getImageUrl = (imagemPath) => {
         if (!imagemPath) {
        console.log("❌ imagemPath é null/undefined");
        return null;
    }
    
    if (imagemPath.startsWith('http')) {
        console.log("✅ É URL completa:", imagemPath);
        return imagemPath;
    }
        
        // remove barras extras e garante o caminho correto
        const path = imagemPath.startsWith('/') ? imagemPath.slice(1) : imagemPath;
        
        if (path.startsWith('media/')) {
            return `${BASE_URL}/${path}`;
        }
        
        return `${BASE_URL}/media/${path}`;
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

    const calcularValorParcela = (preco, parcelas, juros) => {
        if (!preco || !parcelas || parcelas === 0) return 0;
        const precoBase = Number(preco);
        const numParcelas = Number(parcelas);
        const taxaJuros = Number(juros) || 0;
        
        if (taxaJuros === 0) {
            return precoBase / numParcelas;
        }
        return (precoBase * (1 + taxaJuros / 100)) / numParcelas;
    };

    const calcularPrecoPix = (preco) => {
        if (!preco) return 0;
        return Number(preco) * 0.95;
    };

    const calcularPrecoBoleto = (preco) => {
        if (!preco) return 0;
        return Number(preco) * 0.95;
    };

    const processarProduto = (produto) => {
        const precoBase = Number(produto.preco);
        
        const precoPix = produto.preco_pix || calcularPrecoPix(precoBase);
        const precoBoleto = produto.preco_boleto || calcularPrecoBoleto(precoBase);
        const parcelas = produto.parcelas || 10;
        const juros = produto.juros_parcelas || 0;
        const valorParcela = calcularValorParcela(precoBase, parcelas, juros);

        const opcoesParcelas = [];
        for (let i = 1; i <= Number(parcelas); i++) {
            opcoesParcelas.push({
                parcelas: i,
                valor: calcularValorParcela(precoBase, i, juros),
                total: calcularValorParcela(precoBase, i, juros) * i
            });
        }

        return {
            ...produto,
            precoBase,
            precoPix: Number(precoPix),
            precoBoleto: Number(precoBoleto),
            parcelas: Number(parcelas),
            jurosParcelas: Number(juros),
            valorParcela: Number(valorParcela),
            opcoesParcelas
        };
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
            const produtosProcessados = dados.map(processarProduto);
            setProdutos(produtosProcessados);

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
            return processarProduto(dados);

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

            if (!resposta.ok) {
                throw new Error(textoResposta || "Erro ao cadastrar produto.");
            }

            // recarrega a lista inteira em vez de buscar só o produto novo
            await buscarProdutos();

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
                getImageUrl,
                calcularValorParcela,
                calcularPrecoPix,
                calcularPrecoBoleto,
                processarProduto
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