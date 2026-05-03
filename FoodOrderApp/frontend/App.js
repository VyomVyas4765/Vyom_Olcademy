import { collection, onSnapshot } from 'firebase/firestore';

useEffect(() => {
    const unsub = onSnapshot(collection(db, 'menuItems'), snapshot => {
        console.log('📡 Live update — item count:', snapshot.size);
        snapshot.docs.forEach(doc => console.log(' •', doc.data().name));
    });
    return unsub; // cleanup on unmount
}, []);