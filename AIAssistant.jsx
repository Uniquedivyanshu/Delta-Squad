
import { useState } from "react";
import "./AIAssistant.css";

const suggestedQuestions = [
  "Summarize the latest geological survey.",
  "What are the major coal reserve findings?",
  "Compare recent production performance.",
  "What environmental issues are reported?",
];

const mockResponses = {
  "Summarize the latest geological survey.":
    "The latest geological survey indicates promising coal-bearing zones with further exploration recommended in selected areas. The report also highlights geological mapping and reserve estimation activities.",

  "What are the major coal reserve findings?":
    "Based on the available mock documents, the estimated coal reserves show significant potential across the surveyed mining blocks. Detailed reserve validation would require the processed geological and exploration datasets.",

  "Compare recent production performance.":
    "The latest production information indicates stable operational performance. A detailed month-on-month comparison will be available once production datasets are connected to the GeoMineAI analytics engine.",

  "What environmental issues are reported?":
    "The environmental assessment highlights areas such as land management, air quality, water management and ecological monitoring. Further analysis can be performed after the environmental documents are processed.",
};

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "Hello! I'm GeoMineAI Assistant. I can help you analyze geological, mining, production and environmental documents.",
    },
  ]);

  const [question, setQuestion] = useState("");

  const sendMessage = (text) => {
    const cleanQuestion = text.trim();

    if (!cleanQuestion) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: cleanQuestion,
    };

    setMessages((previous) => [...previous, userMessage]);

    const response =
      mockResponses[cleanQuestion] ||
      "I understand your question. In the current demo mode, I can provide responses based on predefined GeoMineAI examples. Real document-based AI analysis will be connected later.";

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "ai",
          text: response,
        },
      ]);
    }, 500);

    setQuestion("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(question);
  };

  return (
    <main className="ai-assistant-page">
      <div className="ai-page-header">
        <div>
          <div className="ai-breadcrumb">
            GeoMineAI / AI Assistant
          </div>

          <h1>GeoMineAI Assistant</h1>

          <p>
            Ask questions and explore insights from geological,
            mining, production and environmental information.
          </p>
        </div>

        <div className="ai-status">
          <span className="ai-status-dot"></span>
          Demo Mode
        </div>
      </div>

      <section className="ai-workspace">
        <div className="chat-header">
          <div className="chat-title">
            <div className="chat-avatar">AI</div>

            <div>
              <strong>GeoMineAI Intelligence</strong>
              <span>Document analysis assistant</span>
            </div>
          </div>

          <span className="context-badge">
            Document Context
          </span>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={`message-row ${message.role}`}
              key={message.id}
            >
              {message.role === "ai" && (
                <div className="message-avatar">AI</div>
              )}

              <div className="message-content">
                <div className="message-label">
                  {message.role === "ai"
                    ? "GeoMineAI"
                    : "You"}
                </div>

                <div className="message-bubble">
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="suggested-section">
          <span>Suggested questions</span>

          <div className="suggested-questions">
            {suggestedQuestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => sendMessage(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <form
          className="chat-input-area"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Ask GeoMineAI about your documents..."
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
          />

          <button type="submit">Send ↗</button>
        </form>

        <div className="ai-disclaimer">
          Demo responses are currently based on mock data.
          Real AI document analysis will be connected during
          backend integration.
        </div>
      </section>
    </main>
  );
}

export default AIAssistant;
