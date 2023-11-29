'use client';

import React, { useState, useEffect } from 'react';
import { getAllThreadsAction } from '../actions/getAllThreads';
import ProfileModal from './ProfileModal';
const defaultProfilePic = '/user-icon.png';
import { useRouter } from 'next/navigation';
import ThreadButton from './ThreadButton';

interface ThreadHistoryProps {
  username: string;
  onLogout: () => void;
}

// ThreadHistory component displays a list of all chat threads and manages user profile interactions
const ThreadHistory: React.FC<ThreadHistoryProps> = ({ username, onLogout }) => {
  const [threads, setThreads] = useState<Thread[]>([]); // State to store user's chat threads
  const [showProfileModal, setShowProfileModal] = useState(false); // State to control the visibility of the profile modal
  const [user, setUser] = useState(''); // State to store the current user's username
  const router = useRouter();

  // Function to toggle the visibility of the profile modal
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  // Function to navigate to the home page for starting a new chat
  const handleNewChat = () => {
    router.push('/');
  };

  // Function to close the profile modal
  const handleClose = () => {
    setShowProfileModal(false);
  }

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setShowProfileModal(false);
      setUser(username);
      const getThreads = async () => {
        const threads = await getAllThreadsAction(username);
        setThreads(threads);
      };

      getThreads();
    }
  }, []);

  useEffect(() => {
    setShowProfileModal(false);
    const getThreads = async () => {
      const threads = await getAllThreadsAction(username);
      setThreads(threads);
    };

    getThreads();
  }, [username]);

  return (
    <div id="chat_history">
      {/* Button to start a new chat */}
      <div className="new-chat-button" onClick={handleNewChat}>
        <span className="new-chat">+ New Chat</span>
      </div>

      {/* List of chat threads */}
      <div className="threads-list">
        {threads.map((thread) => (
          <ThreadButton key={thread.id} name={thread.name || "A Fun Conversation"} threadId={thread.thread_id} />
        ))}
      </div>


      {/* Profile section with a button to open the profile modal */}
      <div className="profile-section" onClick={toggleProfileModal}>
        <img src={defaultProfilePic} alt="Profile" className="profile-pic" width={40} height={40} />
        <span className="username">{username}</span>
      </div>

      {/* Profile modal for user profile management */}
      {showProfileModal && (
        <ProfileModal
          username={username}
          onLogout={() => {
            onLogout();
            setShowProfileModal(false);
          }} onClose={handleClose} />
      )}
    </div>
  );
};

export default ThreadHistory;