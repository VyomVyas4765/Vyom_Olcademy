// frontend/src/hooks/useMenu.js
import { useState, useEffect } from 'react';
import { subscribeToMenu } from '../services/menuService';

/**
 * Custom hook for fetching real-time menu items
 * @returns {object} - {items, loading, error}
 */
export const useMenu = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Subscribe to real-time updates
        const unsubscribe = subscribeToMenu(
            (data) => {
                // Sort by category, then by name (in JavaScript)
                const sorted = data.sort((a, b) => {
                    if (a.category !== b.category) {
                        return a.category.localeCompare(b.category);
                    }
                    return a.name.localeCompare(b.name);
                });
                setItems(sorted);
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        // Cleanup: unsubscribe when component unmounts
        return unsubscribe;
    }, []);

    return { items, loading, error };
};