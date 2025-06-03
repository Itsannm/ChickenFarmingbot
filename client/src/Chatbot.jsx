import React, { useState } from "react";
import { sendMessageToOpenAI } from "./api";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m your Chicken Farming Assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setIsLoading(true);

    // Get AI response
    const aiResponse = await sendMessageToOpenAI(input);

    setMessages((msgs) => [
      ...msgs,
      { from: "bot", text: aiResponse },
    ]);
    setIsLoading(false);
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Chicken Farming Chatbot</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 10,
          height: 300,
          overflowY: "scroll",
          background: "#fafafa",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.from === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 16,
                background: msg.from === "user" ? "#4caf50" : "#eee",
                color: msg.from === "user" ? "white" : "black",
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {isLoading && (
          <div style={{ textAlign: "left", margin: "8px 0" }}>
            <span style={{ background: "#eee", borderRadius: 16, padding: "8px 12px" }}>
              Typing...
            </span>
          </div>
        )}
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about chicken farming..."
          style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#4caf50", color: "white" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
