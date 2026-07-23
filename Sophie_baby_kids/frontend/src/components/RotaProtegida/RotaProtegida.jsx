import { Navigate } from "react-router-dom";

function RotaProtegida({ children }) {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (!usuarioLogado) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RotaProtegida;