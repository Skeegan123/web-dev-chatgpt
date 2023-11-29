'use server';

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Initiates a chat with an OpenAI assistant to generate a name based on the input message.
 * 
 * @param {string} chatMessage - The input message to the chatbot, used to generate a name.
 * @returns {Promise<{ response: string }>} An object containing the response from the chatbot.
 */
export async function nameChat(chatMessage: string) {
    try {
        // Create a new conversation thread using OpenAI's API
        const thread = await openai.beta.threads.create();
        const threadId = thread.id;

        // Send the initial user message to the newly created thread
        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: chatMessage,
        });

        // Start the conversation run, specifying the assistant ID
        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: process.env.OPENAI_NAME_ASSISTANT_ID || "",
        });

        // Polling loop to check the status of the conversation run
        let counter = 0;
        let success = false;
        let status = await openai.beta.threads.runs.retrieve(threadId, run.id);
        while (status.status !== "completed" && counter < 3000) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            status = await openai.beta.threads.runs.retrieve(threadId, run.id);
            counter++;

            // Update success flag if the run is completed
            if (status.status === "completed") {
                success = true;
            }
        }

        // If the run did not complete successfully, throw an error
        if (!success) {
            throw new Error('Error calling OpenAI API');
        }

        // Retrieve and return the last message from the thread, which is the response
        const messages: any = await openai.beta.threads.messages.list(threadId);
        const answer = messages.data[0].content[0].text.value;

        return { response: answer };
    } catch (error) {
        console.error('Error in nameChat:', error);
        throw error;
    }
}