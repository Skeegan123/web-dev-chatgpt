// ChatArea.tsx
'use client'
import React, { useState } from 'react';

interface Message {
  role: string;
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    // Logic to handle sending a new message (you can customize this part)
    console.log('Sending message:', newMessage);
    // Clear the input field after sending the message
    setNewMessage('');
  };

  return (
    <div id="chat_area">
      <div>
        {messages.map((message, index) => (
          <div key={index} id='message'>
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div id='input'>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message ChatGPT..."
        />
        <button onClick={handleSendMessage}>&#8593;</button>
      </div>
    </div>
  );
};

export default ChatArea;