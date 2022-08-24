import React, { createContext, useState } from "react";
import {
    addDoc,
    collection,
    getFirestore,
    writeBatch,
    query,
    where,
    getDocs,
    documentId,
} from "firebase/firestore";

export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    //Agrega producto al Carrito y/o actualiza cantidad si ya esta en el carrito
    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
            setCartItems(cartItems.map(product => { return product.id === item.id ? { ...product, quantity: product.quantity + quantity } : product }));
        } else {
            setCartItems([...cartItems, { ...item, quantity }]);
        }
    };

    //Vacia el carrito
    const clearCart = () => setCartItems([]);

    //Verifica si existe el producto en el carrito
    const isInCart = (id) => cartItems.find(product => product.id === id);

    //Elimina producto del carrito
    const removeItem = (id) => setCartItems(cartItems.filter(product => product.id !== id));

    //Suma el precio de todos los productos
    const totalPrice = () => {
        return cartItems.reduce((previous, actual) => previous + actual.quantity * actual.precio, 0);
    }

    const totalProd = () =>
        cartItems.reduce(
            (acc, productoActual) => acc + productoActual.quantity,
            0,
        );

    const sendOrder = async (buyerData) => {
        const db = getFirestore();
        const orderCollection = collection(db, "orders");
        const order = {
            //items: cartItems,
            buyer: buyerData,
        };

        const batch = writeBatch(db);
        const idList = cartItems.map((product) => product.id);
        const withoutStock = [];
        const collectionRef = collection(db, "products");
        const docsResponse = await getDocs(
            query(collectionRef, where(documentId(), "in", idList))
        );
        docsResponse.docs.forEach((doc) => {
            const dataDoc = doc.data();
            const prod = cartItems.find((prod) => prod.id === doc.id);

            if (dataDoc.stock >= prod.quantity) {
                batch.update(doc.ref, { stock: dataDoc.stock - prod.quantity });
            } else {
                withoutStock.push({ prod });
            }
        });
        if (withoutStock.length === 0) {
            //addDoc(orderCollection, order);
            batch.commit();
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addItem, clearCart, isInCart, removeItem, totalPrice, totalProd, sendOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
