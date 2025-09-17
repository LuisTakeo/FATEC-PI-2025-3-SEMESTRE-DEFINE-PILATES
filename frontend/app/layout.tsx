import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${dmSans.variable} ${inter.variable}`}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}