import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "../src/styles/variables.css";
import { CartProvider } from "./context/CartContext/CartContext";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { ProductProvider } from "./context/ProductContext/ProductContext";
import { BannerProvider } from './context/BannerContext/BannerContext.jsx';

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <CartProvider>
                <ProductProvider>
                    <BannerProvider>
                        <App />
                    </BannerProvider>
                </ProductProvider>
            </CartProvider>
        </AuthProvider>
    </StrictMode>
)