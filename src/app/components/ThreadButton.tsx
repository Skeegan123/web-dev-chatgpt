import React from 'react';
import { useRouter } from 'next/navigation';

interface ThreadButtonProps {
    name: string;
    threadId: string;
}

const ThreadButton: React.FC<ThreadButtonProps> = ({ name, threadId }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/chat/${threadId}`);
    };

    return (
        <button className="thread-button" onClick={handleClick}>
            {name}
        </button>
    );
};

export default ThreadButton;
