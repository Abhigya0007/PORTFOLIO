document.addEventListener('DOMContentLoaded', function () {
    const typingTitle = document.getElementById('typing-title');
    const text = "I am a web Developer"; // Text to type

    let index = 0;

    // Typing function
    function type() {
        if (index < text.length) {
            typingTitle.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 100); // Typing speed
        } else {
            setTimeout(() => {
                typingTitle.innerHTML = ""; // Clear text for looping
                index = 0; // Reset index
                type(); // Restart typing
            }, 1000); // Delay before restarting
        }
    }

    // Start typing when DOM is loaded
    type();
});


// Get the canvas and set up the context
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to be used in the "rain"
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()[]{}|<>?';
const fontSize = 18;  // Size of the characters
const columns = canvas.width / fontSize;  // Number of columns

// Initialize the drops (one for each column)
let drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;  // Random starting point for each column
}





// Function to draw the rain
function draw() {
    // Set the background color with some opacity to create the "trailing" effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text style for the matrix effect
    ctx.fillStyle = '#0F0';  // Green color like in the Matrix
    ctx.font = `${fontSize}px monospace`;

    // Loop through each column
    for (let i = 0; i < drops.length; i++) {
        // Get a random character from the characters string
        const text = characters[Math.floor(Math.random() * characters.length)];

        // Draw the character at the current drop position
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move the drop downwards, reset it to the top when it goes off the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;  // Reset to the top
        }

        // Move the drop down by one unit
        drops[i]++;
    }
}

// Update the canvas every frame
setInterval(draw, 33);  // Approximately 30 frames per second
