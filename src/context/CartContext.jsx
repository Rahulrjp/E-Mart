import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);

    const addToCart = (product) => {
        const itemInCart = cartItem.find((item) => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cartItem.map((item) => {
                return item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item;
            })
            setCartItem(updatedCart)
            toast.success("Quantity Increased")
        } else {
            setCartItem([...cartItem, { ...product, quantity: 1 }])
            toast.success("Product is added to Cart")
        }
    }

    const updateQuantity = (id, newQuantity) => {
    setCartItem(cartItem.map(item => {
        if (item.id === id) {
            const updatedQuantity = Math.max(newQuantity, 1);
            if (updatedQuantity > item.quantity) {
                toast.success("Quantity increased!");
            } else if (updatedQuantity < item.quantity) {
                toast.success("Quantity decreased!");
            }
            return { ...item, quantity: updatedQuantity };
        }
        return item;
    }));
};

    
    const removeFromCart = (id) =>{
        setCartItem(cartItem.filter(item => item.id !== id));
        toast.success('Product is removed')
    }

    return <CartContext.Provider value={{ cartItem, setCartItem, addToCart, updateQuantity, removeFromCart }}>
        {children}
    </CartContext.Provider>
}

export const useCart = () => useContext(CartContext);