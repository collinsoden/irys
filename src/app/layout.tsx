import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Irys 3D",
  description: "Irys 3D is a cutting-edge platform for exploring and visualizing 3D data.",
  keywords: ["Irys 3D", "3D visualization", "data exploration"],
  authors: [{ name: "Irys Team" }],
  creator: "Irys",
  publisher: "Irys",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://irys-3d.vercel.app"),
  openGraph: {
    title: "Irys 3D - Explore and Visualize 3D Data",
    description: "Irys 3D is a cutting-edge platform for exploring and visualizing 3D data.",
    url: "https://irys-3d.vercel.app",
    siteName: "Irys 3D",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irys 3D - Explore and Visualize 3D Data",
    description: "Irys 3D is a cutting-edge platform for exploring and visualizing 3D data.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview":3 -1,
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