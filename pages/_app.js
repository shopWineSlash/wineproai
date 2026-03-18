import '../styles/globals.css';

/**
 * The custom App component allows you to persist layout and state across
 * pages. It also imports our global stylesheet so that Tailwind or custom
 * CSS is applied on every page. See Next.js documentation for details:
 * https://nextjs.org/docs/basic-features/layouts
 */
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
