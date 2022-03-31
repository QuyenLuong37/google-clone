import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import 'regenerator-runtime/runtime'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen">
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </div>
  );
}

export default MyApp;
