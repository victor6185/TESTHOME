// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://ten-omega26.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "글로벌 구매대행 서비스 | 전 세계 상품을 빠르고 안전하게",
    template: "%s | 글로벌구매대행",
  },
  description:
    "미국, 일본, 유럽의 인기 브랜드부터 한정판까지. 전문가가 직접 구매하고 검수하여 배송해드립니다. 합리적인 수수료, 평균 7일 배송, 24/7 고객지원.",
  alternates: {
    canonical: siteUrl,
    languages: { ko: `${siteUrl}/` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "글로벌 구매대행 서비스 | 전 세계 상품을 빠르고 안전하게",
    description:
      "미국, 일본, 유럽의 인기 브랜드부터 한정판까지. 전문 구매대행 서비스로 안전하고 빠르게 받아보세요. 실시간 참여 현황, 공동구매 할인 혜택 제공.",
    siteName: "글로벌구매대행",
    images: [
      {
        url: `${siteUrl}/og-image.png`, // public/og-image.png
        width: 1200,
        height: 630,
        alt: "글로벌 구매대행 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "글로벌 구매대행 서비스",
    description: "전 세계 상품을 빠르고 안전하게. 합리적인 수수료와 전문 검수.",
    images: [`${siteUrl}/og-image.png`], // public/og-image.png
  },
  keywords: [
    "구매대행",
    "해외직구",
    "미국구매대행",
    "일본구매대행",
    "유럽구매대행",
    "글로벌쇼핑",
    "해외배송",
    "직구대행",
    "명품구매대행",
    "스니커즈구매대행",
    "공동구매",
    "할인쇼핑",
  ],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "shopping",
  verification: {
    // 필요한 경우 추가:
    // google: "구글 서치 콘솔 인증 코드",
    // naver: "네이버 서치어드바이저 인증 코드",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "글로벌구매대행",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description:
                "전 세계 상품을 빠르고 안전하게 구매대행하는 전문 서비스",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "고객 지원",
                availableLanguage: ["Korean"],
                areaServed: "KR",
              },
              sameAs: [],
            }),
          }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "구매대행 서비스",
              provider: {
                "@type": "Organization",
                name: "글로벌구매대행",
              },
              areaServed: {
                "@type": "Country",
                name: "대한민국",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "구매대행 서비스",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "미국 구매대행",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "일본 구매대행",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "유럽 구매대행",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
