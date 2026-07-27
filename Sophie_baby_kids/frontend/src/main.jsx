import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "../src/styles/variables.css";
import { CartProvider } from "./context/CartContext/CartContext";
import { ProductProvider } from "./context/ProductContext/ProductContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CartProvider>
            <ProductProvider>
                <App />
            </ProductProvider>
        </CartProvider>
    </StrictMode>
)