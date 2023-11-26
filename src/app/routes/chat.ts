// import OpenAI from "openai";
// import dotenv from "dotenv";
// import { NextApiRequest, NextApiResponse } from "next";

// dotenv.config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     console.log(req.body);
//     if (req.method === 'POST') {
//         const { chatMessage, user } = req.body;

//         try {
//             const gptThread = await openai.beta.threads.create();

//             const message = await openai.beta.threads.messages.create(
//                 gptThread.id,
//                 {
//                     role: "user",
//                     content: chatMessage,
//                 }
//             );

//             const run = await openai.beta.threads.runs.create(
//                 gptThread.id,
//                 {
//                     assistant_id: process.env.OPENAI_ASSISTANT_ID || "",
//                 }
//             );

//             let status = await openai.beta.threads.runs.retrieve(gptThread.id, run.id);

//             let counter = 0;

//             let success = false;

//             while (status.status !== "completed" && counter < 1000) {
//                 await new Promise((resolve) => setTimeout(resolve, 100));
//                 status = await openai.beta.threads.runs.retrieve(gptThread.id, run.id);
//                 counter++;

//                 if (status.status === "completed") {
//                     success = true;
//                 }
//             }

//             if (!success) {
//                 res.status(500).json({ error: 'Error calling OpenAI API' });
//                 return;
//             }

//             const messages: any = await openai.beta.threads.messages.list(gptThread.id);

//             const answer = messages.data[0].content[0].text.value;

//             res.status(200).json(answer);
//         } catch (error) {
//             res.status(500).json({ error: 'Error calling OpenAI API' });
//         }
//     } else {
//         // Handle any other HTTP methods
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }