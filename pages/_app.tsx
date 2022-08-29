import '../styles/globals.css';
import '../react-frame-contextmenu/style.less';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
