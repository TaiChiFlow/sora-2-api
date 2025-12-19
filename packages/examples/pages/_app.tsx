import type { AppProps } from 'next/app';
import { Fraunces, IBM_Plex_Sans } from 'next/font/google';

import '../styles/globals.css';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${body.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
