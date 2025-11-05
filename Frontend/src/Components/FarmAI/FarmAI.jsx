import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./FarmAI.css";

const API_URL = "http://localhost:5000/chat"; // Change to your local backend

function App() {
  const [messages, setMessages] = useState([{ sender: "AI", text: "Hi! I am Agriconnect AI. What can I help with?" }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to format AI response text
  const formatText = (text) => {
    // Convert **text** to bold
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points (- or *) to proper list items
    formatted = formatted.replace(/^[\-\*]\s+(.+)$/gm, '• $1');
    
    // Convert numbered lists
    formatted = formatted.replace(/^(\d+\.)\s+(.+)$/gm, '$1 $2');
    
    // Add line breaks for better readability
    formatted = formatted.replace(/\n/g, '<br/>');
    
    return formatted;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(API_URL, 
        { message: currentInput },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000 // 30 second timeout
        }
      );
      
      const aiMessage = { 
        sender: "AI", 
        text: response.data.response,
        isFormatted: true 
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = "Failed to connect to Agriconnect AI. ";
      
      if (error.code === 'ECONNREFUSED') {
        errorMessage += "Make sure the backend server is running on port 5000.";
      } else if (error.response?.status === 400) {
        errorMessage += "Invalid request format.";
      } else if (error.response?.status === 401) {
        errorMessage += "API authentication failed.";
      } else {
        errorMessage += "Please try again.";
      }
      
      setMessages((prev) => [...prev, { sender: "AI", text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "You" ? "user-msg" : "ai-msg"}>
            <strong>{msg.sender}:</strong> 
            {msg.isFormatted ? (
              <div 
                className="formatted-text" 
                dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
              />
            ) : (
              <span>{msg.text}</span>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="ai-msg">
            <strong>AI:</strong> <span className="typing-indicator">Thinking...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Ask about farming..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isLoading}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !input.trim()}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? "..." : "↑"}
        </button>
      </div>
    </div>
  );
}

export default App;
