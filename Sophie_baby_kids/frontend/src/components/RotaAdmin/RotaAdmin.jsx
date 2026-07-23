import { Navigate } from "react-router-dom";

function RotaAdmin({ children }) {
    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogado")
    );

    if (!usuario) {
        return <Navigate to="/login" />;
    }

    if (usuario.tipo !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
}

export default RotaAdmin;