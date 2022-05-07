import React from 'react';
import { ChatBubble } from './ChatBubble';

export const ChatFeed = ({ messages, loggedInUser }) => {

    const bubbles = [...messages].reverse().map(messageObject => {

        const { sendBy, message, _id } = messageObject;
        const isOwn = loggedInUser._id === sendBy._id;
        return <ChatBubble key={_id} username={sendBy.username} message={message} isOwn={isOwn} />
    });
    return <div id="messagesFeed">{bubbles}</div>
}