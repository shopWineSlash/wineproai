import { useState, useRef, useEffect } from 'react';
import styles from '../styles/chat.module.css';

/**
 * ChatWidget provides a simple chat interface for interacting with the
 * chatbot. It maintains a list of message objects and posts new
 * messages to the serverless API route when the user submits the form.
 */
export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! Ask me anything about wine.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Handles sending a message to the API endpoint. It appends the user
   * message to the chat log, calls the backend, and appends the
   * assistant's reply when complete. Error handling is included to
   * gracefully notify the user if something goes wrong.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();
      // Expect data.reply to be an object with role and content
      if (data && data.reply) {
        setMessages((prev) => [...prev, data.reply]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Hmm, I didn\'t quite get that.' }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again later.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatWidget}>
      <div className={styles.messagesWrapper}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === 'user' ? styles.userMessage : styles.assistantMessage
            }
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className={styles.assistantMessage}>...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about wine..."
          className={styles.input}
        />
        <button type="submit" disabled={loading || !input.trim()} className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}
