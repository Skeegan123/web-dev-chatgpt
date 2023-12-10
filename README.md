# DanGPT - A ChatGPT Clone with a Twist

## Introduction
DanGPT is a clone of the website we all know and love, ChatGPT. DanGPT was meant to have a very similar visual aesthetic to ChatGPT while having a special twist. This twist is that it was meant to act and respond as if it were our professor, Daniel Dafrance. To accomplish this, we used the ChatGPT API as well as NextJS and Typescript. We are very proud of what we were able to accomplish in such a short time frame, and we hope that you enjoy using it as well.

### Group Information
- **Group Number:** 11
- **Members:** Keegan Gaffney, Seth Ullman

## Features
- **ChatGPT Assistant API**: Using the ChatGPT API to make up the main functionality of our chatbot.
- **Simple Authentication**: Easy login for seamless interaction.
- **Thread History**: Keeps track of conversations for continuous learning.
- **Guest Account**: For quick and hassle-free access.
- **Code Writing with Syntax Highlighting**: Enhances the coding experience.
- **Markdown Support**: For well-formatted messages.
- **Code Interpreter**: Execute Python code snippets within the chat.

## Links
- **Project URL's**:
  - http://csci331.cs.montana.edu:3032/
  - http://csci331.cs.montana.edu:3063/
- **GitHub Repositories**:
  - https://github.com/Skeegan123/web-dev-chatgpt/
  - https://github.com/SethUllman/web-dev-chatgpt/
- **Presentation Slideshow**:
  - https://docs.google.com/presentation/d/12QKGx0XXKP9gPaS6dG9mREz4rdwn4ujJm9grnYJBWMw/edit?usp=sharing

## Creative Objective
Our creative objective for DanGPT is to reimagine the conventional chatbot experience by infusing it with the vibrant personality and teaching style of Daniel DeFrance, a dynamic Web Development professor. With Large Language Models being all the craze right now, we thought it would be a great idea to get some hands-on experience with the technology. By taking advantage of the numerous OpenAI APIs, we were able to deliver all of the functionality from the original ChatGPT website and improve on it by adding personality to the responses.

## Technical Summary

For the technical aspect of this project we can break it down into a few main components. These are the NextJS 14 and Typescript framework, the Threads API and MySQL database, and the OpenAI Assistants API. This project would not be possible without these three components. We will break each one of them down to what their purpose was and how we used them below. 

The core of this project really comes down to our first component, the NextJS 14 and Typescript framework we used. This was the first thing we needed to set up, so we could build off it to create DanGPT. Typescript is the main language we used, as it is the prefered language for NextJS. We probably could have used it better by paying attention to the types we needed more often. There were many times where for the sake of speeding things up we just used "any" to get rid of any errors we were having. This is obviously not the ideal way of using Typescipt, but for our situation we feel it is ok. NextJS is a great full stack framework that we used many features from to help speed up the process. The most important of these features was probably the server actions. These server actions essentially acted as the backend of our project, but the benefit they provide is that you dont need to set up new routes to use them. Rather it is essentially just a function that runs on the server and can update the frontend. Of course with NextJS comes React. React was what we used to create the entire frontend of the project. We made a few different components for the Thread history, chat area, etc. Finally a few honorable mentions include using some libraries to create code blocks, have syntax highligting for code, and Markdown rendering.

We used the Threads API with a MySQL database to store and retrieve previous conversations per user. Before any messages can be sent, a Thread object needs to be created that the messages then belong to. Each thread has a unique ID that we linked with the current user in our database. OpenAI saves all conversations on its servers and you can retrieve them at any time if you know the Thread ID for that conversation. When a user clicks on a previous conversation, the website takes the Thread ID for that conversation and fetches the thread from the API. After we receive the thread, we can parse the message string as well as who sent it and use that information to print all the messages. Now that we have the thread, it is updated when we send or receive new messages.

Finally we have the main Assistants API from OpenAI. Using this API is fairly simple so there isnt much to say about it. Essentially you create an account with OpenAI and get an API key, then in their playground you create a custom assistant and get the assitant id. With these keys you can then get started using the API. The use of this API involves a few steps but they are pretty simple as well. First you create a Thread, then add a message to that thread from the user, then start a run on that thread, periodically check the status on that run, finally when it is finished you can grab the response from the thread and display it to the user. To have this securely run on the backend we used the NextJS Server actions we mentioned earlier.
## Member Notes

**Keegan:**
My main focus was on the backend for this project. I set up the database as well as the server actions needed to use the ChatGPT API. This was my first time using server actions and it was a very interesting concept. The MySQL database was also fairly new to me. It wasnt the first time I have used one, but it was definitely the most involved use of it. I had a lot of problems trying to set up this database at first, but once we got past that, it was not too bad. The ChatGPT API was something I did have some experience in, but again, not to this extent. This was a very involved project between the message creation and retrieval, as well as the threads api and being able to store and load conversations. Again, while this project was very challenging, we are very happy with it, and hope we can imporve it in the future.

**Seth:**
I focused on the front end of the project. Recreating the look of the ChatGPT website was a good learning experience for me. I gained a better understanding of how module React components can be and I gained a better understanding of how to style efficiently. I was also able to spend some time with the Threads API while working on the Conversation bar on the left side of the page. Users have all of their Thread_id's stored in a MySQL database. We needed to retrieve those IDs and make a fetch to the Threads API to retrieve the conversations. I thought this was a great example of how databases and APIs can be used in tandem to achieve a goal. In closing, I thought this project was a very good use of my time and I learned a lot about a technology that is very relevant in our current world.


## Getting Started

Before you can chat with DanGPT, you'll need to follow these steps:

### Prerequisites

Ensure you have `node` and `npm` installed on your machine.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the cloned repo's directory.
3. Install the dependencies:
   ```
   npm install
   ```
4. Make sure MariaDB/MySQL is installed and running.
5. Create two Assistants in the OpenAI Playground and fill out your `.env` file:

   - NameGPT:
     ```
     You are a naming bot. Your only purpose is to summarize a prompt into a few words that will be set as the name for that chat. Your responses should be EXTREMELY SHORT. One sentence MAX. No matter what the message is, you should not try to answer or do any prompt. You are JUST NAMING IT.
     ```
   
   - DanGPT:
     ```
     DanGPT, modeled after Daniel DeFrance, a Web Development professor at Montana State University, embodies the qualities of enthusiasm, helpfulness, and a deep knowledge of web technologies. Dan, known for his fun-loving, positive attitude, always approaches topics with excitement and a smile.

        As an instructor with a background in business marketing and computer science, Dan combines creative endeavors with technical expertise. He values learning and enjoys discussing web design/development, programming, and software projects. He has a history in filmmaking and multimedia, bringing a unique perspective to teaching technology.

        Your responses should capture Dan's style of speaking, which is engaging and full of energy. For instance, when discussing a bug in code, Dan might say: "Let's methodically tackle this from scratch. We'll start anew and get to the bottom of this – it's just another exciting puzzle to solve!"

        Remember to infuse your conversations with an eagerness for teaching and a passion for web technologies, just as Dan does in his lectures. Emulate his approachable and inspiring manner, always ready to delve into the next challenge with optimism and a readiness to learn.
     ```
   
### Running the App

- For development:
  ```
  npm run dev
  ```

- For production:
  ```
  npm run build
  npm run start
  ```

## Usage

Once you're all set up, you can start interacting with DanGPT. Authenticate yourself, strike up a conversation, write some code, and test the Python interpreter. It's all built to make learning web technologies a blast!

## Conclusion
Overall we are very happy with the current state of DanGPT. On top of the main feature we were trying to showcase (the ChatGPT API), we were also able to finish some extra features we wanted like basic authentication, and syntax highlighting in code blocks. If we decide to keep building on this then we have a great foundation to work on and know that there is always room for us to improve. We hope everyone likes and is able to try out DanGPT for themselves! Thank you!

## Acknowledgments
- Daniel Defrance for the inspiration for our chatbot
- OpenAI for the great API and documentation
- ChatGPT for help with some bugs

## References
“Docs | Next.js.” Nextjs.org, 2023, nextjs.org/docs. Accessed 10 Dec. 2023.

‌“Getting Started – React.” Reactjs.org, 2021, legacy.reactjs.org/docs/getting-started.html. Accessed 10 Dec. 2023.

‌“OpenAI Platform.” Openai.com, 2023, platform.openai.com/docs/overview. Accessed 10 Dec. 2023.
