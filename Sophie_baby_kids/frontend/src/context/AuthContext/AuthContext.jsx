import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = localStorage.getItem(
            "usuarioLogado"
        );

        return usuarioSalvo
            ? JSON.parse(usuarioSalvo)
            : null;
    });

    function login(dadosUsuario) {
        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(dadosUsuario)
        );

        setUsuario(dadosUsuario);
    }

    function logout() {
        localStorage.removeItem(
            "usuarioLogado"
        );

        setUsuario(null);
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}