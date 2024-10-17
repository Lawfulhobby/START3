import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "@/components/theme-provider"
import '@coinbase/onchainkit/styles.css';
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const satoshiBold = localFont({
  src: "./fonts/Satoshi-Bold.woff",
  variable: "--font-satoshi-bold",
  weight: "700",
});


export const metadata: Metadata = {
  title: "Start3",
  description: "Onboarding the next billions users to Web3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Radiant Blog"
          href="/blog/feed.xml"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${satoshiBold.variable} bg-background antialiased h-full`}
      >
          <Providers>{children}</Providers>
          <Toaster/>
      </body>
    </html>
  );
}
