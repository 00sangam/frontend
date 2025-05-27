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

// Add swipe-to-reply logic
document.querySelectorAll('.message').forEach((msgEl) => {
  let startX = 0;
  let currentX = 0;
  let threshold = 40; // how far to swipe to trigger reply

  msgEl.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  msgEl.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    if (diffX > 0 && diffX < 80) {
      msgEl.style.transform = `translateX(${diffX}px)`;
    }
  });

  msgEl.addEventListener('touchend', () => {
    const diffX = currentX - startX;

    if (diffX > threshold) {
      // Slide triggered
      msgEl.classList.add('reply-slide');

      // Trigger reply
      const messageText = msgEl.querySelector('.text').textContent;
      replyingTo = messageText;
      replyText.textContent = messageText;
      replyBox.classList.remove("hidden");
    }

    // Reset slide
    msgEl.style.transform = 'translateX(0)';
    currentX = 0;
    startX = 0;
  });
});



