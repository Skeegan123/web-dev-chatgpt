import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

interface IMessage {
    role: string;
    content: string;
    isLoading?: boolean; // Optional prop to indicate loading state
}

const MessageDisplay: React.FC<{ message: IMessage, user?: string }> = ({ message, user }) => {
    const renderContent = () => {
        // If the message is loading, return a loading indicator
        if (message.isLoading) {
            return (
                <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            );
        }

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
                            <span className="language-label">{language}</span>
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
                <img src={avatarSrc} alt="Profile" width={35} height={35} />
            </div>
            <div className="message-content">
                <strong>{message.role === "assistant" ? "DanGPT" : user || "User"}:</strong>
                <div>{renderContent()}</div>
            </div>
        </div>
    );
};

export default MessageDisplay;