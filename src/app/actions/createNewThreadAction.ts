'use server';

import { createThread } from "@/db/utils";

export async function createNewThreadAction(username: string, newMessage?: string, name?: string): Promise<string> {
    try {
        const newThread = await createThread(username, newMessage, name);
        return newThread.thread_id;
    } catch (error) {
        console.error('Error in createNewThreadAction:', error);
        throw error;
    }
}