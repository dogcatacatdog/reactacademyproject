import React, { useState, useRef, useEffect } from "react";
import "./Home.css";

function Home() {
  const [messages, setMessages] = useState([
    { role: "system", text: "학습 도우미 AI Tutor : 무엇이든 물어보세요" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "ai", text: data.answer || "답변을 받아오지 못했습니다." }
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { role: "ai", text: "서버 오류가 발생했습니다." }
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">학습 도우미 AI Tutor : 무엇이든 물어보세요!</div>
      <div className="chatbot-messages">
        {messages.slice(1).map((msg, idx) => (
          <div
            key={idx}
            className={`chatbot-message ${msg.role === "user" ? "user" : "ai"}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="chatbot-message ai">답변을 불러오는 중...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          placeholder="질문을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Home;