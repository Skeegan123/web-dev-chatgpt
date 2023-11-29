'use client';

import { useEffect, useState } from 'react';
import ChatArea from './ChatArea'
import ThreadHistory from './ThreadHistory';
import LoginModal from './components/LoginModal';
import { findOrCreateUserAction } from './actions/findOrCreateUserAction';


export default function Home() {
  const messages: { role: string; content: string; }[] = []
  const [user, setUser] = useState('');
  const [showModal, setShowModal] = useState(true);

  const handleLogin = async (username: string, password: string) => {
    const user = await findOrCreateUserAction(username, password);

    if (user) {
      localStorage.setItem('username', username); // Save username to localStorage
      setUser(username);
      setShowModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove username from localStorage
    setUser('');
    // Navigate to the home page
    window.location.href = '/';
  };

  const handleGuest = () => {
    localStorage.setItem('username', 'Guest');
    setUser('Guest');
    setShowModal(false);
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setShowModal(false);
      setUser(username);
    }
  }, [user]);

  // Show the modal only on the first page load
  useEffect(() => {
    if (!user) {
      setShowModal(true);
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showModal && (
        <div className="modal-overlay">
          <LoginModal onLogin={handleLogin} onGuest={handleGuest} />
        </div>
      )}

      <div id="chat_history"><ThreadHistory username={user} onLogout={handleLogout} ></ThreadHistory></div>
      <ChatArea user={user} messages={messages}></ChatArea>
    </main>
  )
}
