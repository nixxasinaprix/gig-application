// src/app/layout.jsx
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Sahyog - Cooperative Gig Platform | SIH 2026",
  description: "A cooperative-owned digital marketplace connecting Labour Cooperative Federations with households and institutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}