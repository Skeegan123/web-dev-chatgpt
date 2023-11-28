'use client';

import React, { useState, useEffect } from 'react';
import { getAllThreadsAction } from './actions/getAllThreads';
const Thread = require('../db/models/Thread');

interface ThreadHistoryProps {
  username: string;
}

const ThreadHistory: React.FC<ThreadHistoryProps> = ({ username }) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const getThreads = async () => {
      const threads = await getAllThreadsAction(username);
      setThreads(threads);
    };

    getThreads();
  }, []);

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