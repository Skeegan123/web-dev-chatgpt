'use client';

import { usePathname } from 'next/navigation';
import ChatArea from '../../ChatArea'
import { useEffect, useRef, useState } from 'react';
import { fetchChatHistory } from '@/app/actions/fetchChatHistory';
import { sendMessageAction } from '@/app/actions/sendMessageAction';
import { createNewThreadAction } from '@/app/actions/createNewThreadAction';
import router from 'next/router';
// import ChatHistory from './ChatHistory'


export default function Chat() {
    const query = usePathname();
    const threadId = query.split('/')[2];
    const [messages, setMessages] = useState<{ "role": string, "content": string }[]>([]);
    let loaded = useRef(false);

    useEffect(() => {
        async function fetchHistoryAndRespond() {
            if (loaded.current) { return; }
            loaded.current = true;
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
                        'Guest',
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
    }, []);



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div id="chat_history"></div>
            <ChatArea messages={messages}></ChatArea>
        </main>
    )
}
