'use client';
import React, { useEffect, useState } from 'react';
import { sendMessageAction } from './actions/sendMessageAction';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createNewThreadAction } from './actions/createNewThreadAction';

interface Message {
  role: string;
  content: string;
}

interface ChatAreaProps {
  messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages: initialMessages }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [localMessages, setLocalMessages] = useState<Message[]>(initialMessages);
  const router = useRouter();
  const searchParams = usePathname();
  const threadId = searchParams.split('/')[2];

  // console.log('threadId:', threadId);

  useEffect(() => {
    setLocalMessages(initialMessages);
  }, [initialMessages]);

  const handleSendMessage = async () => {
    try {
      const chatMessage = newMessage;
      setNewMessage(''); // Clear the input field
      let currentThreadId = threadId;

      if (!currentThreadId) {
        currentThreadId = await createNewThreadAction('Guest', newMessage); // Create a new thread
        router.push(`/chat/${currentThreadId}`); // Navigate to the new chat thread URL
        return;
      } else {
        setLocalMessages(prevMessages => [...prevMessages, { role: 'user', content: chatMessage }]);
        // Now send the message to the OpenAI API asynchronously
        const result = await sendMessageAction(chatMessage, 'Guest', currentThreadId);
        // Update the local state with the assistant's response
        setLocalMessages(prevMessages => [...prevMessages, { role: 'assistant', content: result?.response }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setLocalMessages(prevMessages => [...prevMessages, { role: 'error', content: 'Error sending message' }]);
    }
  };

  return (
    <div id="chat_area">
      <div>
        {localMessages.map((message: any, index) => (
          <div key={index} id='message'>
            <strong>{message.role}:</strong> {message.content || message.content[0].text.value}
          </div>
        ))}
      </div>
      <div id='input'>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newMessage.trim()) {
              e.preventDefault(); // Prevents the default action of the Enter key
              handleSendMessage();
            }
          }}
          placeholder="Message ChatGPT..."
        />
        <button onClick={handleSendMessage}>&#8593;</button>
      </div>
    </div>
  );
};

export default ChatArea;