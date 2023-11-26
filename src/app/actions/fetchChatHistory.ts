'use server';

import OpenAI from "openai";

export async function fetchChatHistory(thread_id: string): Promise<any> {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const messages: any = await openai.beta.threads.messages.list(thread_id);
        return messages.data;
    } catch (error) {
        console.error('Error in fetchChatHistory:', error);
        throw error;
    }
}