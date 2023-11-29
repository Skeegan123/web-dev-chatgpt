'use server';

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Sends a message to an OpenAI assistant within a specific chat thread and retrieves the response.
 * 
 * @param {string} chatMessage - The message content to be sent.
 * @param {string} user - The username of the user sending the message.
 * @param {string} threadId - The ID of the chat thread.
 * @param {boolean} newThread - Flag indicating if this is a new thread.
 * @returns {Promise<{ response: string }>} An object containing the assistant's response.
 */
export async function sendMessageAction(chatMessage: string, user: string, threadId: string, newThread: boolean = false) {
    try {
        // Retrieve the latest run and its status
        const existingMessages = await openai.beta.threads.messages.list(threadId);
        const latestRunId = existingMessages.data[0]?.run_id;

        // If there's an active run, wait for its completion
        if (latestRunId) {
            let latestRunStatus = await openai.beta.threads.runs.retrieve(threadId, latestRunId);
            while (latestRunStatus.status !== "completed") {
                await new Promise((resolve) => setTimeout(resolve, 100)); // Polling delay
                latestRunStatus = await openai.beta.threads.runs.retrieve(threadId, latestRunId);
            }
        }

        // For existing threads, create a new message
        if (!newThread) {
            await openai.beta.threads.messages.create(threadId, {
                role: "user",
                content: chatMessage,
            });
        }

        // Start a new run for the assistant to process the message
        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: process.env.OPENAI_ASSISTANT_ID || "",
        });

        // Poll for the completion of the run
        let counter = 0;
        let success = false;
        let status = await openai.beta.threads.runs.retrieve(threadId, run.id);
        while (status.status !== "completed" && counter < 3000) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            status = await openai.beta.threads.runs.retrieve(threadId, run.id);
            counter++;

            // Mark success if the run is completed
            if (status.status === "completed") {
                success = true;
            }
        }

        // Throw an error if the run didn't complete successfully
        if (!success) {
            throw new Error('Error calling OpenAI API');
        }

        // Retrieve and return the latest message, which is the assistant's response
        const messages: any = await openai.beta.threads.messages.list(threadId);
        const answer = messages.data[0]?.content[0]?.text?.value;

        return { response: answer };
    } catch (error) {
        console.error('Error in sendMessageAction:', error);
        throw error;
    }
}