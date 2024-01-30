// src/App.js
import { useState, useEffect } from 'react';
import './App.css';
import { app } from './firebase';
import { saveMessage } from './firebase';
import { getMessages } from './firebase';

function App() {
  app 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages from firebase on component mount
    getMessages().then((fetchedMessages) => {
      setMessages(fetchedMessages);
    });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Save new message to firebase
      saveMessage({ text: newMessage, sender: 'user' }).then(() => {
        // Fetch updated messages from firebase
        getMessages().then((fetchedMessages) => {
          setMessages(fetchedMessages);
        });
      });
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <div className="mb-4 h-40 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
