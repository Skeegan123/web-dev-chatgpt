'use client';

import React, { useState, useEffect } from 'react';
import { getAllThreadsAction } from './actions/getAllThreads';
import ProfileModal from './components/ProfileModal';
const Thread = require('../db/models/Thread');
const defaultProfilePic = '/user-icon.png';

interface ThreadHistoryProps {
  username: string;
  onLogout: () => void;
}

const ThreadHistory: React.FC<ThreadHistoryProps> = ({ username, onLogout }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState('');

  // Function to toggle profile modal
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

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
    <div>
      <h2>Thread History</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            {thread.thread_id} - {thread.created_at.toISOString()}
          </li>
        ))}
      </ul>
      {/* Profile section */}
      <div className="profile-section" onClick={toggleProfileModal}>
        <img src={defaultProfilePic} alt="Profile" className="profile-pic" width={40} height={40} />
        <span className="username">{username}</span> {/* Use the prop directly */}
      </div>
      {showProfileModal && (
        <ProfileModal
          username={username} // Use the prop directly
          onLogout={() => {
            onLogout();
            setShowProfileModal(false);
          }}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ThreadHistory;