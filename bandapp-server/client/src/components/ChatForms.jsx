import React from 'react';

export const ChatForm = ({ sendMessage }) => {

    const [message, setMessage] = React.useState('');

    const handleTyping = (event) => {
        const { value } = event.target;
        setMessage(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(message);
        setMessage('');
    };

    const handleKeys = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                name="message"
                onChange={handleTyping}
                onKeyDown={handleKeys}
                value={message}
                placeholder="Write your message here...">
            </textarea>

            <button type="submit">Send</button>
        </form>
    )
}