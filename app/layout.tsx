import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "James Aathithyan — Full-Stack Developer",
  description:
    "Final-year B.Tech Information Technology student at PPG Institute of Technology and full-stack developer specializing in MERN applications, REST APIs, and real-time systems.",
  icons: {
    icon: [
      { url: "/james3d-logo.png?v=6", type: "image/png" },
      { url: "/favicon.ico?v=6", sizes: "any" },
    ],
    shortcut: "/james3d-logo.png?v=6",
    apple: "/james3d-logo.png?v=6",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="icon" type="image/png" href="/james3d-logo.png?v=6" />
        <link rel="icon" href="/favicon.ico?v=6" sizes="any" />
        <link rel="shortcut icon" href="/james3d-logo.png?v=6" />
        <link rel="apple-touch-icon" href="/james3d-logo.png?v=6" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full bg-black text-white font-sans selection:bg-white/20 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}

