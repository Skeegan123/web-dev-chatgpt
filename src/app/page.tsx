'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatArea from './components/ChatArea';
import ThreadHistory from './components/ThreadHistory';
import LoginModal from './components/LoginModal';
import { findOrCreateUserAction } from './actions/findOrCreateUserAction';

export default function Home() {
  const [user, setUser] = useState('Guest');
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  // useEffect hook to check if the user is logged in and if so, set the username
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setShowModal(false);
      setUser(username);
    }
  }, [user]);

  // useEffect hook to check if the user is logged in and if not, show the login modal
  useEffect(() => {
    if (!user) {
      setShowModal(true);
    }
  }, [user]);

  // Function to handle logging in
  const handleLogin = async (username: string, password: string) => {
    const user = await findOrCreateUserAction(username, password);

    if (user) {
      localStorage.setItem('username', username);
      setUser(username);
      setShowModal(false);
    }
  }

  // Function to handle logging in as a guest
  const handleGuest = () => {
    handleLogin('Guest', '');
    setShowModal(false);
  }

  // Function to handle logging out
  const handleLogout = () => {
    localStorage.removeItem('username');
    setUser('');
    router.push('/');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showModal && (
        <div className="modal-overlay">
          <LoginModal onLogin={(username: string, password: string) => handleLogin(username, password)}
            onGuest={() => handleGuest()} />
        </div>
      )}
      <ThreadHistory username={user} onLogout={() => handleLogout()} />
      <ChatArea user={user} info messages={[]} />
    </main>
  )
}
