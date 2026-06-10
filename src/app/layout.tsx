import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Subheader from "@/components/Subheader";
import Footer from "@/components/Footer";
import { SignalProvider } from "@/context/SignalContext";

export const metadata: Metadata = {
  title: "The AI Signal | Atlas Intelligence",
  description: "A premium intelligence platform for the global AI ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-airbnb-bg text-airbnb-charcoal">
        <SignalProvider>
          <Header />
          <Subheader />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
        </SignalProvider>
      </body>
    </html>
  );
}
