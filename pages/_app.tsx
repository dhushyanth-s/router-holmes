import type { AppProps } from "next/app";
import Script from "next/script";
import { Sidebar } from "../components/sidebar";
import "../style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Sidebar>
      <Component {...pageProps} />
    </Sidebar>
  );
}
