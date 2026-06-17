import { UserProvider } from "@/context/UserContext";
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import "../globals.css";

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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <UserProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
