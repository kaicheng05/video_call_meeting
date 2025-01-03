// Function to switch between panels
function showPanel(panelId, menuItem) {
    // Hide all panels
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => panel.classList.remove('active-panel'));

    // Show the selected panel
    document.getElementById(panelId).classList.add('active-panel');

    // Update active menu-item
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    menuItem.classList.add('active');
}

// Open chat for the selected user
function openChat(userName) {
    document.getElementById('chat-user').innerText = userName;
    document.getElementById('chat-messages').innerHTML = ''; // Clear previous chat
    if (!localStorage.getItem(userName)) {
        localStorage.setItem(userName, JSON.stringify([])); // Initialize empty chat history if not exists
    }
    loadChatHistory(userName);

    // Update active user
    const userItems = document.querySelectorAll('.user-list li');
    userItems.forEach(item => item.classList.remove('active-user'));
    userItems.forEach(item => {
        if (item.innerText === userName) {
            item.classList.add('active-user');
        }
    });
}

// Load chat history from localStorage
function loadChatHistory(userName) {
    const chatHistory = JSON.parse(localStorage.getItem(userName)) || [];
    const chatMessagesDiv = document.getElementById('chat-messages');
    chatMessagesDiv.innerHTML = ''; // Clear existing messages
    chatHistory.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
        chatMessagesDiv.appendChild(messageDiv);
    });
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Auto-scroll to bottom
}

// Save message to localStorage
function saveMessage(userName, message, sender) {
    const chatHistory = JSON.parse(localStorage.getItem(userName)) || [];
    chatHistory.push({ sender, text: message });
    localStorage.setItem(userName, JSON.stringify(chatHistory));
}

// Send message for the meeting chat
function sendMeetingMessage() {
    const messageInput = document.getElementById('meetingMessageInput');
    const message = messageInput.value.trim();
    if (message) {
        const roomName = document.getElementById('room-name').innerText;
        const chatHistory = roomChats[roomName];
        chatHistory.push({ sender: 'You', text: message });
        roomChats[roomName] = chatHistory; // Update chat history
        addMeetingMessage(message, 'You');
        messageInput.value = ''; // Clear the input after sending
    }
}

// Add message to the meeting chat
function addMeetingMessage(message, sender) {
    const chatMessagesDiv = document.getElementById('meeting-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessagesDiv.appendChild(messageDiv);
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Auto-scroll to bottom
}

// Voice call button action
function startVoiceCall() {
    alert('Voice call started!');
}

// File upload button action
function uploadMeetingFile() {
    alert('File upload initiated!');
}

// Enable "Enter" to send message
document.getElementById('meetingMessageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();  // Prevent the default action (new line in input)
        sendMeetingMessage();  // Call the sendMeetingMessage function
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Automatically open chat for the first user in the list
    openChat('User 1');

    // Add an event listener to the message input field to detect the "Enter" key
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // Prevent the default action (new line in input)
            sendMessage();  // Call the sendMessage function
        }
    });
});

// Populate device dropdowns with example options
const devices = ["Device 1", "Device 2", "Device 3"];
const populateDevices = (id) => {
    const select = document.getElementById(id);
    devices.forEach((device) => {
        const option = document.createElement("option");
        option.value = device;
        option.textContent = device;
        select.appendChild(option);
    });
};

// Initialize device dropdowns
populateDevices("mic-select");
populateDevices("headphone-select");
populateDevices("camera-select");

// Confirm Button
document.getElementById("confirm-button").addEventListener("click", () => {
    alert("Settings saved successfully!");
    // Redirect to Home Page
    document.querySelectorAll(".panel").forEach(panel => panel.classList.remove("active-panel"));
    document.getElementById("home").classList.add("active-panel");
});

// Logout Button
document.getElementById("logout-button").addEventListener("click", () => {
    alert("Logged out!");
    // Redirect to Login Page
    window.location.href = "login.html";
});

// Maintain chat history for each room
const roomChats = {};

function openMeetingRoom(roomName) {
    // Hide all panels
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active-panel'));
    
    // Show the meeting room panel
    document.getElementById('meeting-room').classList.add('active-panel');
    
    // Update room info
    document.getElementById('room-name').innerText = roomName;
    document.getElementById('participant-count').innerText = `Participants: ${Math.floor(Math.random() * 10 + 1)}`; // Example participant count

    // Load chat history for the room
    const chatMessagesDiv = document.getElementById('meeting-chat-messages');
    chatMessagesDiv.innerHTML = ''; // Clear previous messages
    const chatHistory = roomChats[roomName] || [];
    chatHistory.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
        chatMessagesDiv.appendChild(messageDiv);
    });
    roomChats[roomName] = chatHistory; // Initialize chat if not already

    // Update the exit button text
    updateExitButton(roomName);
}

function sendMeetingMessage() {
    const messageInput = document.getElementById('meetingMessageInput');
    const message = messageInput.value.trim();
    if (message) {
        const roomName = document.getElementById('room-name').innerText;
        const chatHistory = roomChats[roomName];
        chatHistory.push({ sender: 'You', text: message });
        roomChats[roomName] = chatHistory; // Update chat history
        addMeetingMessage(message, 'You');
        messageInput.value = ''; // Clear the input after sending
    }
}

function addMeetingMessage(message, sender) {
    const chatMessagesDiv = document.getElementById('meeting-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessagesDiv.appendChild(messageDiv);
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Auto-scroll to bottom
}

function toggleMicrophone() {
    const micBtn = document.getElementById('mic-btn');
    micBtn.classList.toggle('active');
    alert(micBtn.classList.contains('active') ? 'Microphone is ON' : 'Microphone is OFF');
}

function toggleCamera() {
    const cameraBtn = document.getElementById('camera-btn');
    cameraBtn.classList.toggle('active');
    alert(cameraBtn.classList.contains('active') ? 'Camera is ON' : 'Camera is OFF');
}

function shareScreen() {
    const screenBtn = document.getElementById('screen-btn');
    const screenDiv = document.getElementById('shared-screen');
    screenBtn.classList.toggle('active');
    screenDiv.innerHTML = screenBtn.classList.contains('active') ? '<p>Screen sharing...</p>' : 'No screen shared';
}

function exitMeeting() {
    const roomName = document.getElementById('room-name').innerText;
    if (roomName === 'KRoom') {
        showPanel('home', document.querySelector('.menu-item[onclick*="home"]')); // Exit to home panel
    } else {
        openMeetingRoom('KRoom'); // Exit to KRoom
    }
}

// Update the exit button text based on the current room
function updateExitButton(roomName) {
    const exitButton = document.getElementById('exit-meeting-btn');
    if (roomName !== 'KRoom') {
        exitButton.innerText = 'Back to KRoom';
    } else {
        exitButton.innerText = 'Exit Meeting';
    }
}

// Add event listeners to room buttons
document.querySelectorAll('.rooms-grid .join-button').forEach(button => {
    button.addEventListener('click', () => {
        const roomName = button.textContent.trim();
        openMeetingRoom(roomName); // Open the meeting room with the correct name
    });
});

// KRoom navigation button
document.querySelector('.menu-item[onclick*="kroom"]').addEventListener('click', () => {
    openMeetingRoom('KRoom'); // Open KRoom meeting directly
});

let localStream = null; // Stream for camera and microphone
let screenStream = null; // Stream for screen sharing

// Toggle the microphone
async function toggleMicrophone() {
    const micBtn = document.getElementById("mic-btn");
    try {
        if (!localStream || !localStream.getAudioTracks().length) {
            localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micBtn.textContent = "Mic Off";
            alert("Microphone is now active.");
        } else {
            localStream.getAudioTracks().forEach(track => track.stop());
            micBtn.textContent = "Mic";
            alert("Microphone is turned off.");
        }
    } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Unable to access the microphone. Please check permissions.");
    }
}

// Toggle the camera
async function toggleCamera() {
    const cameraBtn = document.getElementById("camera-btn");
    try {
        if (!localStream || !localStream.getVideoTracks().length) {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.getElementById("screenVideo"); // For demonstration
            videoElement.srcObject = localStream;
            cameraBtn.textContent = "Camera Off";
            alert("Camera is now active.");
        } else {
            localStream.getVideoTracks().forEach(track => track.stop());
            const videoElement = document.getElementById("screenVideo");
            videoElement.srcObject = null;
            cameraBtn.textContent = "Camera";
            alert("Camera is turned off.");
        }
    } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Unable to access the camera. Please check permissions.");
    }
}

// Share the screen
async function shareScreen() {
    const screenBtn = document.getElementById("screen-btn");
    const screenVideo = document.getElementById("screenVideo"); // Video element for shared screen
    try {
        if (!screenStream) {
            screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            screenVideo.srcObject = screenStream;
            screenBtn.textContent = "Stop Sharing";
            alert("Screen sharing is active.");
        } else {
            screenStream.getTracks().forEach(track => track.stop());
            screenVideo.srcObject = null;
            screenStream = null;
            screenBtn.textContent = "Share Screen";
            alert("Screen sharing stopped.");
        }
    } catch (error) {
        console.error("Error sharing screen:", error);
        alert("Unable to share the screen. Please check permissions.");
    }
}

// Exit the meeting
function exitMeeting() {
    const roomName = document.getElementById("room-name").innerText;
    if (roomName === "KRoom") {
        showPanel("home", document.querySelector('.menu-item[onclick*="home"]'));
    } else {
        openMeetingRoom("KRoom");
    }
}
