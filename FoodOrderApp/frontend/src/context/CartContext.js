// frontend/src/context/CartContext.js
import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

/**
 * Cart reducer — handles all cart mutations
 */
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find((item) => item.id === action.payload.id);

            if (existingItem) {
                // Item already in cart — increment quantity
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }

            // New item — add to cart
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };

        case 'UPDATE_QTY':
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        case 'CLEAR_CART':
            return { ...state, items: [] };

        case 'UPDATE_ADDRESS':
            return {
                ...state,
                deliveryAddress: action.payload
            };

        default:
            return state;
    }
};

/**
 * CartProvider — wraps your app
 */
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        deliveryAddress: 'Link Rd, Mumbai, 400053'
    });

    // Derived values — never store these separately
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const value = {
        items: state.items,
        deliveryAddress: state.deliveryAddress,
        itemCount,
        totalPrice,
        addItem: (item) =>
            dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: item.quantity || 1 } }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        updateQty: (id, quantity) =>
            dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        setDeliveryAddress: (address) => dispatch({ type: 'UPDATE_ADDRESS', payload: address }),
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * useCart hook — use this in any component to access cart state
 */
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used inside CartProvider');
    }
    return context;
};
