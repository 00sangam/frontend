// Replace with your backend URL
const socket = io("https://backend-0keh.onrender.com");

// Ask for username
const username = prompt("Enter your name");

// Elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// Send message
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", {
      user: username,
      message: input.value
    });
    input.value = "";
  }
});

// Receive message
socket.on("chat message", function (data) {
  const item = document.createElement("li");
  item.classList.add("message");

  if (data.user === username) {
    item.classList.add("my-message");
  } else {
    item.classList.add("other-message");
  }

  item.textContent = `${data.user}: ${data.message}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
