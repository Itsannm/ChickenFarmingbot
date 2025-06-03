// client/src/api.js
export async function sendMessageToOpenAI(message) {
  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error:", error);
    return "Oops! Something went wrong. Please try again later.";
  }
}
