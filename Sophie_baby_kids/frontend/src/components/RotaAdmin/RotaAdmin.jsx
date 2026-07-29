import { Navigate } from "react-router-dom";

function RotaAdmin({ children }) {
    // Verifica se o admin está logado
    const adminLogado = localStorage.getItem("admin_logado") === "true";

    // Se não estiver logado, redireciona para o login
    if (!adminLogado) {
        return <Navigate to="/login" replace />;
    }

    // Se estiver logado, mostra a página
    return children;
}

export default RotaAdmin;