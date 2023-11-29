'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { sendMessageAction } from '../actions/sendMessageAction';
import { createNewThreadAction } from '../actions/createNewThreadAction';
import MessageDisplay from './MessageDisplay';
import InfoPanel from './InfoPanel';
import { nameChat } from '../actions/nameChat';

interface Message {
  role: string;
  content: string;
  isLoading?: boolean;
}

interface ChatAreaProps {
  user: string;
  messages: Message[];
  info?: boolean;
}

// The ChatArea component handles the display and interaction within the chat interface
const ChatArea: React.FC<ChatAreaProps> = ({ user, messages: initialMessages, info = false }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [localMessages, setLocalMessages] = useState<Message[]>(initialMessages);
  const [username, setUsername] = useState<string>(user);
  const router = useRouter();
  const query = usePathname();
  const threadId = query.split('/')[2];
  const textAreaRef = useRef(null);

  // Set the username based on local storage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Update local messages when the initialMessages prop changes
  useEffect(() => {
    setLocalMessages(initialMessages);
  }, [initialMessages]);

  // Function to handle the sending of a new message
  const handleSendMessage = async () => {
    try {
      const chatMessage = newMessage;
      setNewMessage(''); // Clear the input field
      let currentThreadId: any = threadId;

      // Add the user's message immediately to the local state
      setLocalMessages(prevMessages => [...prevMessages, { role: 'user', content: chatMessage }]);

      // Add a loading message for the assistant's response
      const loadingMessage = { role: 'assistant', content: '...', isLoading: true };
      setLocalMessages(prevMessages => [...prevMessages, loadingMessage]);

      if (!currentThreadId) {
        const name = await nameChat(chatMessage);
        currentThreadId = await createNewThreadAction(username, newMessage, name.response); // Create a new thread
        router.push(`/chat/${currentThreadId}`); // Navigate to the new chat thread URL
        // Remove loading state as navigation will cause re-render
        setLocalMessages(prevMessages => prevMessages.filter(message => !message.isLoading));
      } else {
        // Now send the message to the OpenAI API asynchronously
        const result = await sendMessageAction(chatMessage, username, currentThreadId);
        // Update the local state with the assistant's response
        setLocalMessages(prevMessages => {
          // Remove the loading message and add the assistant's response
          return prevMessages.filter(message => !message.isLoading).concat({ role: 'assistant', content: result?.response });
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Update the local state by removing the loading message and showing an error message
      setLocalMessages(prevMessages => prevMessages.filter(message => !message.isLoading).concat({ role: 'error', content: 'Error sending message' }));
    }
  };

  // Function to handle the change event of the textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    const maxHeight = 240; // Maximum height in pixels (adjust as needed)
    const textArea: any = textAreaRef.current;
    textArea.style.height = 'auto'; // Reset height to calculate new scroll height
    textArea.style.height = Math.min(textArea.scrollHeight, maxHeight) + 'px';
  };

  return (
    <div id="chat_area">
      {/* Display messages or info panel based on the 'info' prop */}
      <div className="messages">
        {info ? (
          <InfoPanel />
        ) : (
          localMessages.map((message, index) => (
            <MessageDisplay key={index} message={message} user={username} />
          ))
        )}
      </div>
      {/* Input area for typing new messages */}
      <div id='input'>
        <textarea
          ref={textAreaRef}
          value={newMessage}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && newMessage.trim()) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Message DanGPT..."
          rows={1}
          style={{ overflowY: 'auto' }}
        />
        <button onClick={handleSendMessage}>&#8593;</button>
      </div>
    </div>
  );
};

export default ChatArea;