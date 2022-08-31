import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      className="h-full scroll-smooth bg-neon-blue-tone-400 antialiased "
      lang="en"
    >
      <Head />
      <body className="flex h-full flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
