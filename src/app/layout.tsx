import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import MaintenanceScreen from "@/components/layout/MaintenanceScreen";
import { headers } from "next/headers";
import { getMaintenanceMode } from "@/actions/settings";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://myaparts.com.br"),
    title: {
        default: "MYA PARTS | Peças para Empilhadeiras",
        template: "%s | MYA PARTS",
    },
    description: "Catálogo de peças para empilhadeiras. Motor, Freio, Hidráulico e Elétrico para Toyota, Hyster, Yale, Hangcha, Heli e Clark.",
    alternates: {
        canonical: "./",
    },
    openGraph: {
        title: "MYA PARTS | Peças para Empilhadeiras",
        description: "Catálogo de peças para empilhadeiras. Motor, Freio, Hidráulico e Elétrico para Toyota, Hyster, Yale, Hangcha, Heli e Clark.",
        url: "./",
        siteName: "MYA PARTS",
        locale: "pt_BR",
        type: "website",
        images: [
            {
                url: "/mya-logo.png",
                width: 400,
                height: 160,
                alt: "MYA PARTS Logo",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
        },
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let isMaintenance = false;
    let isPainelRoute = false;

    try {
        isMaintenance = await getMaintenanceMode();
        const headersList = await headers();
        const pathname = headersList.get("x-pathname") || "";
        isPainelRoute =
            pathname.startsWith("/painel") ||
            pathname.startsWith("/api") ||
            pathname.startsWith("/_next") ||
            pathname.startsWith("/favicon");
    } catch {
        // fallback if prisma or headers fail during initial build
    }

    if (isMaintenance && !isPainelRoute) {
        return (
            <html lang="pt-BR" suppressHydrationWarning>
                <body
                    suppressHydrationWarning
                    className={`${inter.variable} antialiased min-h-screen flex flex-col bg-industrial-900`}
                >
                    <MaintenanceScreen />
                </body>
            </html>
        );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://myaparts.com.br";
    const globalSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`,
                name: "MYA PARTS",
                url: baseUrl,
                logo: {
                    "@type": "ImageObject",
                    url: `${baseUrl}/mya-logo.png`,
                },
                description: "Peças e componentes para empilhadeiras.",
                contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+55-19-97144-1580",
                    contactType: "Vendas",
                    email: "contato@myaparts.com.br",
                    areaServed: "BR",
                    availableLanguage: "pt",
                },
            },
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                name: "MYA Parts",
                url: baseUrl,
                potentialAction: {
                    "@type": "SearchAction",
                    target: `${baseUrl}/busca?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                },
            },
        ],
    };

    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`${inter.variable} antialiased min-h-screen flex flex-col bg-slate-50 text-foreground`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
                />
                <Header />
                <main className="flex-1 w-full bg-slate-50">
                    {children}
                </main>
                <Footer />
                <CookieBanner />
            </body>
        </html>
    );
}
