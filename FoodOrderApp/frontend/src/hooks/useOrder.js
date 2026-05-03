// frontend/src/hooks/useOrder.js
import { useState } from 'react';
import { createOrder } from '../services/orderService';

/**
 * Custom hook for submitting orders
 * @returns {object} - {submitOrder, orderId, loading, error}
 */
export const useOrder = () => {
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitOrder = async (items, totalPrice, notes = '', deliveryAddress = '') => {
        setLoading(true);
        setError(null);

        try {
            const id = await createOrder(items, totalPrice, notes, deliveryAddress);
            setOrderId(id);
            return id;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { submitOrder, orderId, loading, error };
};