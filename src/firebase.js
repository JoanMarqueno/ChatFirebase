import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyA3w-w_54zwmuRbvUBo1HqVfq45noIYiH4",
    authDomain: "pruebaeliminar-ebaaa.firebaseapp.com",
    projectId: "pruebaeliminar-ebaaa",
    storageBucket: "pruebaeliminar-ebaaa.appspot.com",
    messagingSenderId: "646342597965",
    appId: "1:646342597965:web:7935c42704373a09bd6b04"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Function to save the message to Firebase with current date and time
export const saveMessage = async (message) => {
    try {
        const messagesCollection = collection(db, 'messages');
        const messageWithTimestamp = { ...message, timestamp: new Date() };
        await addDoc(messagesCollection, messageWithTimestamp);
        console.log('Message saved successfully!');
    } catch (error) {
        console.error('Error saving message:', error);
    }
};

// Function to get messages from Firebase, ordered by timestamp
export const getMessages = async () => {
    try {
        const messagesCollection = collection(db, 'messages');
        const messagesQuery = query(messagesCollection, orderBy('timestamp'));
        const messagesSnapshot = await getDocs(messagesQuery);
        const messagesList = messagesSnapshot.docs.map(doc => doc.data());
        return messagesList;
    } catch (error) {
        console.error('Error getting messages:', error);
    }
};
