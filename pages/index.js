import Head from 'next/head';
import ChatWidget from '../components/ChatWidget';

/**
 * The home page for WineProAI. This page introduces visitors to the
 * product and embeds the chat widget so users can interact with your
 * AI-powered wine assistant directly on the page.
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>WineProAI – Your AI-powered wine expert</title>
        <meta name="description" content="WineProAI provides instant wine recommendations and pairing advice via an interactive chatbot." />
      </Head>
      <main className="container">
        <section className="hero">
          <h1>WineProAI</h1>
          <p>Your AI-powered sommelier, ready to help you pick the perfect wine.</p>
        </section>
        <section className="features">
          <h2>What We Offer</h2>
          <ul>
            <li>Instant wine recommendations and food pairings</li>
            <li>Interactive Q&A with our AI sommelier</li>
            <li>Educational resources about grape varieties, regions and tasting notes</li>
          </ul>
        </section>
        <section className="chat-section">
          <h2>Ask Our AI Sommelier</h2>
          <p>Have a question about wine? Start chatting below.</p>
          <ChatWidget />
        </section>
      </main>
    </>
  );
}
