# DanGPT - A ChatGPT UI Clone with a Twist

Welcome to DanGPT's README! This isn't just your ordinary ChatGPT clone – we've jazzed it up with the teaching spirit and positive energy of our beloved professor, Daniel DeFrance. Built with NextJS 14, TypeScript, and a smattering of enthusiasm, DanGPT showcases the versatility and power of the OpenAI ChatGPT API in an interactive and engaging application.

## Features

- **Simple Authentication**: Log in and start conversing with ease!
- **Thread History**: Keep your conversations at hand because learning is an ongoing dialogue.
- **Guest Account**: Just popping by? No problem. Give DanGPT a whirl as a guest!
- **Code Writing with Syntax Highlighting**: Code away with beautiful syntax highlighting.
- **Markdown Support**: Format your messages, just like in your favorite forums!
- **Code Interpreter**: Got Python? Execute code snippets right in the chat.

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

## Support

This is a school project, designed for demonstration and learning. If you encounter issues or have questions, feel free to reach out.

## Acknowledgments

- Professor Daniel DeFrance, for the inspiration and providing the educational foundation for this project.
- OpenAI, for creating the powerful language models that made this project possible.
- DanGPT for writing its own README

---

Happy coding, and remember — stay curious, and keep learning!