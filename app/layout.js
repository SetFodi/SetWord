// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wordle - Daily Word Puzzle Game",
  description:
    "A modern implementation of the popular word puzzle game with daily challenges and unlimited play modes.",
  keywords: "wordle, word game, puzzle, daily challenge, brain teaser",
  authors: [{ name: "Your Name" }],
  // Remove colorScheme from metadata:
  // colorScheme: "dark light",
  openGraph: {
    title: "Setword",
    description: "A modern word puzzle game",
    type: "website",
    locale: "en_US",
  },
};

// Export viewport configuration with color-scheme:
export const viewport = {
  viewport: "width=device-width, initial-scale=1, color-scheme=dark light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a1a1a"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
