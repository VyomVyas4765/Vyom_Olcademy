// frontend/src/services/orderService.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';

/**
 * Submit an order to Firestore
 * @param {Array} items - Array of {id, name, quantity, price}
 * @param {number} totalPrice - Total amount for the order
 * @param {string} notes - Optional special instructions
 * @returns {Promise<string>} - Order ID from Firestore
 */
export const createOrder = async (items, totalPrice, notes = '', deliveryAddress = '') => {
    try {
        const orderRef = await addDoc(collection(db, 'orders'), {
            items: items.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            totalPrice,
            notes,
            deliveryAddress,
            status: 'pending',
            createdAt: serverTimestamp(),
        });

        console.log('✅ Order submitted:', orderRef.id);
        return orderRef.id;
    } catch (error) {
        console.error('❌ Order submission failed:', error);
        throw error;
    }
};