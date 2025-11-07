document.addEventListener('DOMContentLoaded', () => {
    let isFirstMessage = true;
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Auto-resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Send message on Enter (Shift+Enter for new line)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = userInput.value.trim();

        if (!message) return;

        // Clear input and reset height
        userInput.value = '';
        userInput.style.height = 'auto';

        // Remove welcome message if exists
        const welcomeMsg = document.querySelector('.welcome-message');
        if (welcomeMsg) {
            welcomeMsg.remove();
        }

        // Add user message to chat
        addMessage(message, 'user');

        // Disable input while processing
        sendBtn.disabled = true;
        userInput.disabled = true;

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        try {
            // Check if this is the first message
            if (isFirstMessage) {
                isFirstMessage = false;
                // Remove typing indicator
                typingIndicator.remove();
                // Show special first message
                await typeMessage("My Marvee finally you came I was waiting for u Love 💕✨", 'assistant');
            } else {
                // Send to backend API - FIXED: changed from /api/chat1 to /api/chat
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                });

                // Remove typing indicator
                typingIndicator.remove();

                if (!response.ok) {
                    // Log the actual error for debugging
                    const errorText = await response.text();
                    console.error('API Error:', response.status, errorText);

                    try {
                        const errorData = JSON.parse(errorText);
                        addMessage(`Sorry love, something went wrong: ${errorData.details || errorData.error} 💔`, 'assistant');
                    } catch {
                        addMessage('Sorry love, I had trouble thinking of a response. Try again? 💭', 'assistant');
                    }
                    return;
                }

                const data = await response.json();

                if (data.error) {
                    addMessage(`Sorry love, something went wrong: ${data.details || data.error} 💔`, 'assistant');
                } else {
                    // Type out the response with animation
                    await typeMessage(data.response, 'assistant');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.remove();
            addMessage('Oh no, something went wrong. Can you say that again, darling? 💔', 'assistant');
        }

        // Re-enable input
        sendBtn.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;

        messageDiv.appendChild(contentDiv);
        chatContainer.appendChild(messageDiv);

        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    async function typeMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = '';

        messageDiv.appendChild(contentDiv);
        chatContainer.appendChild(messageDiv);

        // Type out the message
        for (let i = 0; i < text.length; i++) {
            contentDiv.textContent += text[i];
            chatContainer.scrollTop = chatContainer.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, 30));
        }
    }

    function showTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';

        messageDiv.appendChild(typingDiv);
        chatContainer.appendChild(messageDiv);

        chatContainer.scrollTop = chatContainer.scrollHeight;

        return messageDiv;
    }

    // Focus input on load
    window.addEventListener('load', () => {
        userInput.focus();
    });
});