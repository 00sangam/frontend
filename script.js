const socket = io("http://localhost:5000");

let username = "";

const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("usernameInput");

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

loginBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name) {
    username = name;
    loginScreen.style.display = "none";
    chatScreen.style.display = "block";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value && username) {
    socket.emit("chat message", {
      user: username,
      text: input.value
    });
    input.value = "";
  }
});

socket.on("chat message", function (data) {
  const item = document.createElement("li");
  item.textContent = `${data.user}: ${data.text}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
