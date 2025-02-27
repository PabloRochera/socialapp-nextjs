import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavBar from '@/app/ui/nav-bar';
import { auth0 } from "./lib/auth0";
import Landing from "./ui/landing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SocialApp",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, modal }) {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col gap-4 p-8`}
        >
          <Landing />
          <div className="flex justify-center">
            <a
              href="/auth/login"
              className="rounded bg-teal-800 hover:bg-teal-700 transition-colors text-white px-8 py-4 text-2xl font-bold shadow-lg"
            >
              Log in
            </a>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <NavBar />
        <div className="p-8 grow flex justify-center items-center">
          {children}
          {modal}
        </div>
      </body>
    </html>
  );
}
