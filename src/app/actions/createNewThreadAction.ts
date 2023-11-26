'use server';

import { createThread } from "@/db/utils";
import OpenAI from "openai";

export async function createNewThreadAction(username: string, newMessage?: string): Promise<string> {
    try {
        const newThread = await createThread(username, newMessage);
        return newThread.thread_id;
    } catch (error) {
        console.error('Error in createNewThreadAction:', error);
        throw error;
    }
}