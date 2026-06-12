import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import Footer from "@/components/Footer";
import { SignalProvider } from "@/context/SignalContext";

const airbnbCereal = localFont({
  src: [
    {
      path: "../../public/fonts/AirbnbCerealApp-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/AirbnbCerealApp-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AirbnbCerealApp-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/AirbnbCerealApp-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/AirbnbCerealApp-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/AirbnbCerealApp-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-airbnb-cereal",
});

export const metadata: Metadata = {
  title: "orbit-News | Atlas Intelligence",
  description: "A premium intelligence platform for the global AI ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${airbnbCereal.variable} font-sans min-h-full flex flex-col bg-airbnb-bg text-airbnb-charcoal`}>
        <SignalProvider>
          <Header />
          <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
            <LeftSidebar />
            <main className="flex-grow py-8 min-w-0">
              {children}
            </main>
          </div>
          <Footer />
        </SignalProvider>
      </body>
    </html>
  );
}
