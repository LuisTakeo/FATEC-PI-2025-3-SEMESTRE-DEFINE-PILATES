import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Italiana } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});
const inter = Inter({
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Define Pilates",
  description: "Aplicação desenvolvida com Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${italiana.variable} font-inter`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
