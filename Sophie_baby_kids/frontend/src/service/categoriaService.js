const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api`;

// Busca todas as categorias do backend
export async function buscarCategorias() {
    try {
        const response = await fetch(`${API_URL}/categorias/`);
        if (!response.ok) throw new Error('Erro ao buscar categorias');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return [];
    }
}

// Busca uma categoria específica
export async function buscarCategoriaPorId(id) {
    try {
        const response = await fetch(`${API_URL}/categorias/${id}/`);
        if (!response.ok) throw new Error('Erro ao buscar categoria');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        return null;
    }
}