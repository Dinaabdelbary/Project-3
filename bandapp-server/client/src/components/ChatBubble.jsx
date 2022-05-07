import React from 'react';

export const ChatBubble = ({ username, message, isOwn }) => {

    const className = isOwn ? 'chat-bubble own' : 'chat-bubble';

    return <div className={className}>
        <p>{!isOwn && <span>{username}</span>}{message}</p>
    </div>
}