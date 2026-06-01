import { UserProvider } from "@/context/UserContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kantina",
  description: "PBO Tubes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Light:opsz,wght,FILL,GRAD@24,100,0,0"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
