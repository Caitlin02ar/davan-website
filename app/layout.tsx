import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import LenisProvider from "@/components/LenisProvider";

const sequel = localFont({
  src: "./fonts/Sequel100Black-75.ttf",
  variable: "--font-sequel",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "DAVAN Website",
  description: "DAVAN WEBSITE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sequel.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
