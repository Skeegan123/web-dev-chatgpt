'use client';

import React, { useState, useEffect } from 'react';
import { getAllThreadsByUsername } from '../db/utils';
import { Thread } from '../db/models/Thread';

interface ThreadHistoryProps {
  username: string;
}

const ThreadHistory: React.FC<ThreadHistoryProps> = ({ username }) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const threadsResult = await getAllThreadsByUsername(username);
        console.log(threadsResult);
        setThreads(threadsResult as Thread[]);
      } catch (error) {
        console.error('Error fetching threads:', error);
        // Handle error appropriately (e.g., show a message to the user)
      }
    };

    fetchThreads();
    console.log(threads);
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
    </div>
  );
};

export default ThreadHistory;