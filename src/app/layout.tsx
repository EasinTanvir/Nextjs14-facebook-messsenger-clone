import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { SessionProviders } from "@/components/SessionProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Facebook Messenger",
  description: "social media application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProviders>
          <Navbar />
          <Toaster position="bottom-center" />
          <main>{children}</main>
        </SessionProviders>
      </body>
    </html>
  );
}
