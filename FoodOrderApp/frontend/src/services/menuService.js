// frontend/src/services/menuService.js
import {
    collection,
    query,
    where,
    onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase.config';

/**
 * Subscribe to real-time menu updates
 * @param {function} onSuccess - Called with array of items whenever data changes
 * @param {function} onError - Called with error if something fails
 * @returns {function} - Unsubscribe function to call in cleanup
 */
export const subscribeToMenu = (onSuccess, onError) => {
    const q = query(
        collection(db, 'menuItems'),
        where('available', '==', true)
    );

    return onSnapshot(
        q,
        (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            onSuccess(items);
        },
        (error) => {
            console.error('Menu fetch error:', error);
            onError(error);
        }
    );
};