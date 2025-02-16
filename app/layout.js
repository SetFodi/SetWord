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
  title: "SetWord - Daily Word Puzzle Game",
  description: "A modern implementation of the popular word puzzle game with daily challenges and unlimited play modes.",
  keywords: "SetWord, word game, puzzle, daily challenge, brain teaser",
  authors: [{ name: "Luka Partenadze" }],
  openGraph: {
    title: "SetWord - Word Puzzle Game",
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
        {/* Theme Color for Light and Dark Mode */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />

        {/* Favicon and Touch Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest for PWA */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
