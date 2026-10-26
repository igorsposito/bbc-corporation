
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000")
  ),

  description:
    "A BBC Corporation conecta pessoas, empresas e oportunidades, construindo relações estratégicas e aproximando negócios de novas possibilidades.",

  applicationName: "BBC Corporation",

  keywords: [
    "BBC Corporation",
    "BBC",
    "conexões empresariais",
    "oportunidades de negócios",
    "parcerias estratégicas",
    "negócios",
    "relações empresariais",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },


openGraph: {
  type: "website",
  locale: "pt_BR",
  siteName: "BBC Corporation",
  title: "BBC Corporation | Grandes Conexões, Novas Oportunidades",
  description:
    "Grandes negócios começam com grandes conexões. Conheça a BBC Corporation e descubra novas possibilidades.",
  images: [
    {
      url: "/images/og-bbc-corporation.png",
      width: 1200,
      height: 630,
      alt: "BBC Corporation — Grandes negócios começam com grandes conexões.",
    },
  ],
},




twitter: {
  card: "summary_large_image",
  title: "BBC Corporation | Grandes Conexões, Novas Oportunidades",
  description:
    "Conectando pessoas, empresas e oportunidades.",
  images: ["/images/og-bbc-corporation.png"],
},


  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
