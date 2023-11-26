'use server';

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function sendMessageAction(chatMessage: string, user: string, threadId: string, newThread: boolean = false) {
    try {
        // Check the status of the latest run and wait for it to complete if it's active
        const existingMessages = await openai.beta.threads.messages.list(threadId);
        const latestRunId = existingMessages.data[0].run_id;

        if (latestRunId) {
            let latestRunStatus = await openai.beta.threads.runs.retrieve(threadId, latestRunId);
            while (latestRunStatus.status !== "completed") {
                await new Promise((resolve) => setTimeout(resolve, 100)); // Wait a bit before checking again
                latestRunStatus = await openai.beta.threads.runs.retrieve(threadId, latestRunId);
            }
        }

        if (!newThread) {
            // Create a new message
            await openai.beta.threads.messages.create(threadId, {
                role: "user",
                content: chatMessage,
            });
        }

        // Create and wait for the new run to complete
        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: process.env.OPENAI_ASSISTANT_ID || "",
        });

        let counter = 0;
        let success = false;
        let status = await openai.beta.threads.runs.retrieve(threadId, run.id);
        while (status.status !== "completed" && counter < 3000) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            status = await openai.beta.threads.runs.retrieve(threadId, run.id);
            counter++;

            if (status.status === "completed") {
                success = true;
            }
        }

        if (!success) {
            throw new Error('Error calling OpenAI API');
        }

        const messages: any = await openai.beta.threads.messages.list(threadId);
        const answer = messages.data[0].content[0].text.value;

        return { response: answer };
    } catch (error) {
        console.error('Error in sendMessageAction:', error);
        throw error;
    }
}


// 'use server';

// import OpenAI from "openai";
// import { fetchChatHistory } from '@/app/actions/fetchChatHistory';
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function sendMessageAction(chatMessage: string, user: string, threadId: string) {
//     try {
//         fetchChatHistory(threadId)
//             .then(async fetchedMessages => {
//                 if (fetchedMessages[0].role !== 'user') {
//                     openai.beta.threads.messages.create(threadId, {
//                         role: "user",
//                         content: chatMessage,
//                     });
//                 }
//             });

//         const run = await openai.beta.threads.runs.create(threadId, {
//             assistant_id: process.env.OPENAI_ASSISTANT_ID || "",
//         });

//         let status = await openai.beta.threads.runs.retrieve(threadId, run.id);

//         let counter = 0;
//         let success = false;

//         while (status.status !== "completed" && counter < 3000) {
//             await new Promise((resolve) => setTimeout(resolve, 100));
//             status = await openai.beta.threads.runs.retrieve(threadId, run.id);
//             counter++;

//             if (status.status === "completed") {
//                 success = true;
//             }
//         }

//         if (!success) {
//             throw new Error('Error calling OpenAI API');
//         }

//         const messages: any = await openai.beta.threads.messages.list(threadId);
//         const answer = messages.data[0].content[0].text.value;

//         return { response: answer };
//     } catch (error) {
//         console.error('Error in sendMessageAction:', error);
//         throw error;
//     }
// }