import { Html, Head, Main, NextScript } from "next/document";
import { cn } from "../utils/classnames";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={cn("antialiase dark min-h-screen bg-background font-sans")}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
