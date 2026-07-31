import { createContext, useContext, useState, useEffect } from "react";
import { buscarCategorias } from "../../services/categoriaService";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categorias, setCategorias] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        carregarCategorias();
    }, []);

    async function carregarCategorias() {
        try {
            setCarregando(true);
            setErro(null);
            const dados = await buscarCategorias();
            setCategorias(dados);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
            setErro('Não foi possível carregar as categorias');
        } finally {
            setCarregando(false);
        }
    }

    // Função para buscar subcategorias de uma categoria
    function getSubcategorias(categoriaId) {
        const categoria = categorias.find(c => c.id === categoriaId);
        return categoria?.subcategorias || [];
    }

    return (
        <CategoryContext.Provider value={{
            categorias,
            carregando,
            erro,
            carregarCategorias,
            getSubcategorias,
        }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategories() {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategories must be used within a CategoryProvider');
    }
    return context;
}