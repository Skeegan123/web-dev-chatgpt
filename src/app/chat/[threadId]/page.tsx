'use client';

import { useEffect, useRef, useState } from 'react';
import ChatArea from '../../components/ChatArea';
import ThreadHistory from '@/app/components/ThreadHistory';
import { fetchChatHistory } from '@/app/actions/fetchChatHistory';
import { sendMessageAction } from '@/app/actions/sendMessageAction';
import { usePathname, useRouter } from 'next/navigation';

export default function Chat() {
    const router = useRouter();
    const query = usePathname();
    const threadId = query.split('/')[2];
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [username, setUsername] = useState('');

    // Function to handle logging out
    const onLogout = () => {
        localStorage.removeItem('username');
        router.push('/');
    }

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        // Function to fetch chat history and respond if needed
        async function fetchHistoryAndRespond() {
            try {
                const fetchedMessages = await fetchChatHistory(threadId);
                const tempMessages = fetchedMessages.map((msg: any) => ({
                    role: msg.role,
                    content: msg.content[0].text.value
                }));

                tempMessages.reverse();

                setMessages(tempMessages);

                // Send a response if the last message was from the user
                if (tempMessages.length > 0 && tempMessages[tempMessages.length - 1].role === 'user') {
                    const result = await sendMessageAction(
                        tempMessages[tempMessages.length - 1].content,
                        username,
                        threadId,
                        true
                    );

                    if (result.response) {
                        setMessages(prev => [...prev, { role: 'assistant', content: result.response }]);
                    }
                }
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        }

        if (threadId) {
            fetchHistoryAndRespond();
        }
    }, [username, threadId]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ThreadHistory username={username} onLogout={onLogout} />
            <ChatArea user={username} messages={messages} />
        </main>
    );
}
