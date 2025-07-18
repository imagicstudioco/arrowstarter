import '@coinbase/onchainkit/styles.css'; 
import './globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from './providers'; 
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { WagmiConfigProvider } from './components/wagmi-config-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arrow Starter - Provide early stage support for ambitious creative projects",
  description: "A lightweight Kickstarter-style launchpad for ambitious creative projects—designed for early-stage support, with built-in trust and upside.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WagmiConfigProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </WagmiConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}   