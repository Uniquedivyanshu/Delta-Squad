
import { useState } from "react";
import "./Assistant.css";

const suggestedQuestions = [
  "Summarize the latest geological survey report",
  "What is the current production trend?",
  "Find potential data conflicts",
  "Explain the coal reserve estimation",
];

const mockResponses = {
  "Summarize the latest geological survey report":
    "The latest geological survey indicates stable coal-bearing formations with favorable reserve potential. Detailed geological interpretation can be connected after backend and AI integration.",

  "What is the current production trend?":
    "Based on the available dashboard data, production shows a positive trend with approximately 8.4% monthly growth and 94.6% target achievement.",

  "Find potential data conflicts":
    "GeoMineAI has currently identified 18 potential data conflicts across recent datasets. Detailed conflict analysis will be available after database integration.",

  "Explain the coal reserve estimation":
    "The coal reserve estimation report contains geological and resource information used to evaluate the available coal reserves. AI-based document analysis will be connected in a later stage.",
};

function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  function sendMessage(question = input) {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) return;

    const response =
      mockResponses[trimmedQuestion] ||
      "This is a mock GeoMineAI response. Real AI-powered analysis will be connected after the backend and AI services are integrated.";

    setMessages((previous) => [
      ...previous,
      {
        type: "user",
        text: trimmedQuestion,
      },
      {
        type: "assistant",
        text: response,
      },
    ]);

    setInput("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="assistant-page">
      <div className="assistant-heading">
        <div>
          <div className="assistant-breadcrumb">
            GeoMineAI / AI Assistant
          </div>

          <h1>AI Assistant</h1>

          <p>
            Ask questions and get intelligent insights from your
            geological, mining and production data.
          </p>
        </div>

        <div className="ai-status">
          <span></span>
          Demo Mode
        </div>
      </div>

      <section className="assistant-container">
        <div className="assistant-top">
          <div className="assistant-brand">
            <div className="assistant-logo">✦</div>

            <div>
              <h2>GeoMineAI Assistant</h2>
              <p>
                Your intelligent assistant for mining intelligence
              </p>
            </div>
          </div>

          <div className="assistant-info">
            <span>DOCUMENT ANALYSIS</span>
            <span>GEOLOGICAL DATA</span>
            <span>MINING INSIGHTS</span>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="assistant-empty">
            <div className="large-ai-icon">✦</div>

            <h2>How can I help you?</h2>

            <p>
              Ask GeoMineAI about geological surveys, mining plans,
              production reports, coal reserves or environmental
              assessments.
            </p>

            <div className="suggested-section">
              <span>Suggested Questions</span>

              <div className="suggested-grid">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                  >
                    <span>✦</span>
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-area">
            {messages.map((message, index) => (
              <div
                className={`message-row ${message.type}`}
                key={index}
              >
                <div className="message-avatar">
                  {message.type === "assistant" ? "✦" : "PK"}
                </div>

                <div className="message-content">
                  <span className="message-label">
                    {message.type === "assistant"
                      ? "GeoMineAI"
                      : "You"}
                  </span>

                  <div className="message-bubble">
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="assistant-input-area">
          <div className="input-wrapper">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask GeoMineAI about your mining data..."
              rows="1"
            />

            <button
              className="send-button"
              onClick={() => sendMessage()}
              disabled={!input.trim()}
            >
              ↑
            </button>
          </div>

          <div className="input-footer">
            <span>
              GeoMineAI Demo Assistant • AI integration coming later
            </span>

            <span>Press Enter to send</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Assistant;