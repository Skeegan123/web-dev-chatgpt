import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { irBlack } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

interface IMessage {
    role: string;
    content: string;
}

const MessageDisplay: React.FC<{ message: IMessage }> = ({ message }) => {
    const renderContent = () => {
        // Split the message content by code block delimiters (```)
        const parts = message.content.split(/(```\w*\n[\s\S]*?\n```)/g);

        return parts.map((part, index) => {
            // Check if this part is a code block with a language specifier
            const codeBlockMatch = part.match(/```(\w*)\n([\s\S]*?)\n```/);
            if (codeBlockMatch) {
                const [, language, code] = codeBlockMatch;
                return (
                    <div key={index} className="code-block">
                        <div className="code-header">
                            <button className="copy-button" onClick={() => navigator.clipboard.writeText(code.trim())}>Copy</button>
                        </div>
                        <SyntaxHighlighter language={language} style={vscDarkPlus}>
                            {code.trim()}
                        </SyntaxHighlighter>
                    </div>
                );
            } else {
                // Render non-code parts as markdown
                return (
                    <ReactMarkdown key={index} rehypePlugins={[rehypeRaw]}>
                        {part}
                    </ReactMarkdown>
                );
            }
        });
    };

    const avatarSrc = message.role === 'assistant' ? '/chatgpt-icon.png' : '/user-icon.png';

    return (
        <div className="message-container">
            <div className="avatar">
                <Image src={avatarSrc} alt="Profile" width={25} height={25} />
            </div>
            <div className="message-content">
                <strong>{message.role}:</strong>
                <div>{renderContent()}</div>
            </div>
        </div>
    );
};

export default MessageDisplay;
