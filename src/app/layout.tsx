"use client";
import { Provider } from "jotai";
import Header from "./Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Event Management App - View all events in Pakistan, mark favorites, and see detailed information including address and time."
          />
          <title>Event Management</title>

          <link rel="icon" sizes="512x512" href="/favicon.ico" />

          <link rel="icon" sizes="192x192" href="/android-chrome-192x192.png" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />

          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="msapplication-TileColor" content="#ffffff" />
        </head>
        <body className="bg-[#F9FAFE]">
          <Header />
          {children}
        </body>
      </html>
    </Provider>
  );
}
