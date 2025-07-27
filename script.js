document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const userModal = document.getElementById('userModal');
    const usernameInput = document.getElementById('usernameInput');
    const saveUsernameButton = document.getElementById('saveUsernameButton');

    let username = localStorage.getItem('kenzeuz_username') || 'Guest';
    usernameDisplay.textContent = username;

    // Show the username modal if no username is set
    if (username === 'Guest') {
        userModal.classList.add('active');
        usernameInput.focus();
    }

    saveUsernameButton.addEventListener('click', () => {
        const newUsername = usernameInput.value.trim();
        if (newUsername) {
            username = newUsername;
            localStorage.setItem('kenzeuz_username', username);
            usernameDisplay.textContent = username;
            userModal.classList.remove('active');
            messageInput.focus(); // Focus on message input after setting username
        } else {
            alert('Please enter a username!');
        }
    });

    // Function to add a message to the chat
    function addMessage(user, message, type = 'received') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);

        if (user && type !== 'system-message') {
            const usernameSpan = document.createElement('span');
            usernameSpan.classList.add('username');
            usernameSpan.textContent = user;
            messageElement.appendChild(usernameSpan);
        }

        const textNode = document.createTextNode(message);
        messageElement.appendChild(textNode);

        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to bottom
    }

    // Function to handle sending a message
    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            // This is where you would integrate with your backend using WebSockets (e.g., Socket.IO)
            // Example: socket.emit('chatMessage', { username: username, message: messageText });

            // For now, it just adds the message as "sent" from the current user.
            // In a real chat, the server would broadcast this message back to all connected clients,
            // including the sender, which would then be displayed as a 'received' message from that user.
            addMessage(username, messageText, 'sent');
            messageInput.value = ''; // Clear input field
        }
    }

    // Add some initial system messages or welcome messages
    addMessage(null, 'Type your message above and hit Send!', 'system-message');
    addMessage(null, 'Your messages will appear here. To see messages from others, you\'ll need to connect a backend server.', 'system-message');
});
