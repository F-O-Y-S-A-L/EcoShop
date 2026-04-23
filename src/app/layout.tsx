import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export const metadata: Metadata = {
  title: "EcoShop swart - Sustainable Marketplace",
  description:
    "An eco-friendly e-commerce platform focusing on sustainable products.",
  icons: {
    icon: "/beverage-cafe-coffee-svgrepo-com.svg",
  },
  openGraph: {
    title: "EcoShop swart - Sustainable Marketplace",
    description:
      "Discover sustainable, eco-friendly products on EcoShop. Shop responsibly and reduce your carbon footprint.",
    url: "https://ecoshop-swart.vercel.app/",
    siteName: "EcoShop swart",
    images: [
      {
        url: "/or-ecoshop.jpg", 
        width: 1200,
        height: 630, 
        alt: "EcoShop swart Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoShop swart - Sustainable Marketplace",
    description:
      "EcoShop swart is your destination for eco-friendly, sustainable products.",
    images: ["or-ecoshop.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="hK7kSE69Kolk3Lbl9py2FeehlsEIUkeWT4kO1MdDKqY" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
