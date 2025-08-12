import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Procodes",
  description: "Procodes is a software company in Calabar, CRS, Nigeria, specializing in trainings and building innovative software solutions for clients.",
  keywords: ["Procodes", "Calabar", "CRS", "Nigeria", "software", "training", "innovation", "clients"],
  authors: [{ name: "Procodes Team" }],
  creator: "Procodes",
  publisher: "Procodes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://procodes.com"),
  openGraph: {
    title: "Procodes - Software Solutions & Trainings",
    description: "Procodes is a software company in Calabar, CRS, Nigeria, specializing in trainings and building innovative software solutions for clients.",
    url: "https://procodes.com",
    siteName: "Procodes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Procodes - Software Solutions & Trainings",
    description: "Procodes is a software company in Calabar, CRS, Nigeria, specializing in trainings and building innovative software solutions for clients.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}