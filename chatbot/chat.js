// chat.js

function toggleChat() {
  const chatBox = document.getElementById("chat-box");

  if (chatBox.style.display === "none" || chatBox.style.display === "") {
    chatBox.style.display = "block";
  } else {
    chatBox.style.display = "none";
  }
}

async function sendMessage() {
  console.log("Sending message...");
  const inputField = document.getElementById("user-input");
  const message = inputField.value.trim();
  if (!message) return;

  appendMessage("You", message);
  inputField.value = "";

  try {
      const response = await fetch("https://temp-j0t6.onrender.com/get_response", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ question: message })
      });

      const data = await response.json();

      if (response.ok) {
          appendMessage("Kushal Bot", data.response);
      } else {
          appendMessage("Kushal Bot", "Something went wrong: " + data.error);
      }
  } catch (error) {
      console.error("Error:", error);
      appendMessage("Kushal Bot", "Failed to connect to the server.");
  }
}

function appendMessage(sender, text) {
  const chatMessages = document.getElementById("chat-messages");
  const messageEl = document.createElement("div");
  messageEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
