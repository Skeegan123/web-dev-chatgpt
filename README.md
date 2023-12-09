# DanGPT - A ChatGPT Clone with a Twist

## Introduction


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
- **Presentation Slideshow**: https://docs.google.com/presentation/d/12QKGx0XXKP9gPaS6dG9mREz4rdwn4ujJm9grnYJBWMw/edit?usp=sharing

## Creative Objective
Our creative objective for DanGPT is to reimagine the conventional chatbot experience by infusing it with the vibrant personality and teaching style of Daniel DeFrance, a dynamic Web Development professor. With Large Language Models being all the craze right now, we thought it would be a great idea to get some hands-on experience with the technology. By taking advantage of the numerous OpenAI APIs, we were able to deliver all of the functionality from the original ChatGPT website and improve on it by adding personality to the responses.

## Technical Summary

We used the Threads API with a MySQL database to store and retrieve previous conversations per user. Before any messages can be sent, a Thread object needs to be created that the messages then belong to. Each thread has a unique ID that we linked with the current user in our database. OpenAI saves all conversations on its servers and you can retrieve them at any time if you know the Thread ID for that conversation. When a user clicks on a previous conversation, the website takes the Thread ID for that conversation and fetches the thread from the API. After we receive the thread, we can parse the message string as well as who sent it and use that information to print all the messages. Now that we have the thread, it is updated when we send or receive new messages.

## Member Notes

**Keegan:**

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

## Individual Contributions
### [Keegan Gaffney](https://github.com/Skeegan123):

  
### [Seth Ullman](https://github.com/SethUllman):
  

## Conclusion


## Acknowledgments


## References

