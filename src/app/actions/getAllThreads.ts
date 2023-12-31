'use server';

import { getAllThreadsByUsername, getAllThreads } from "@/db/utils";
const Thread = require('@/db/models/Thread');

async function getAllThreadsAction(username: string) {
    try {
        const threads: Thread[] = username ? await getAllThreadsByUsername(username) : new Array<Thread>();

        // convert Thread objects to plain objects
        const plainThreads = threads.map((thread: Thread) => {
            return {
                id: thread.id,
                user_id: thread.user_id,
                thread_id: thread.thread_id,
                created_at: thread.created_at,
                name: thread.name
            };
        });

        plainThreads.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        return plainThreads;
    } catch (error) {
        console.error('Error in createNewThreadAction:', error);
        throw error;
    }
}

export { getAllThreadsAction, getAllThreads };
