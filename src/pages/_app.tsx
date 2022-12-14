import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={"dev-860q4exx.us.auth0.com"}
      clientId={"3Uolp2goHaBXgM9qZj2FqnjVllOJVJgI"}
      redirectUri={"https://pfg-messenger-web.vercel.app/dashboard"}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;

/*https://pfg-messenger-web.vercel.app/dashboard*/
