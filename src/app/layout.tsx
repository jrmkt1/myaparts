import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import MaintenanceScreen from "@/components/layout/MaintenanceScreen";
import Chatbot from "@/components/chat/Chatbot";
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
    template: "%s | MYA PARTS"
  },
  description: "Catálogo completo de peças para empilhadeiras. Motor, Freio, Hidráulico e mais para Toyota, Hyster, Yale.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "MYA PARTS | Peças para Empilhadeiras",
    description: "Catálogo completo de peças para empilhadeiras. Motor, Freio, Hidráulico e mais para Toyota, Hyster, Yale.",
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
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Try to safely check maintenance mode. During build time headers() might not be fully populated unless dynamic.
  let isMaintenance = false;
  let isPainelRoute = false;

  try {
    isMaintenance = await getMaintenanceMode();
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || "";
    isPainelRoute = pathname.startsWith('/painel') || pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/favicon');
  } catch {
    // fallback if prisma or headers fail during initial build
  }

  if (isMaintenance && !isPainelRoute) {
    return (
      <html lang="pt-BR" suppressHydrationWarning>
        <body suppressHydrationWarning className={`${inter.variable} antialiased min-h-screen flex flex-col bg-industrial-900`}>
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
        "name": "MYA PARTS",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/mya-logo.png`
        },
        "description": "Distribuidora líder de peças e componentes para empilhadeiras das principais marcas do mercado. Qualidade, agilidade e suporte técnico especializado para a sua frota.",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-19-97144-1580",
          "contactType": "Vendas e Suporte",
          "email": "contato@myaparts.com.br",
          "areaServed": "BR",
          "availableLanguage": "pt"
        },
        "sameAs": [
          "https://www.facebook.com/myaparts",
          "https://www.instagram.com/myaparts/",
          "https://www.linkedin.com/company/mya-parts/"
        ]
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#author`,
        "name": "Rodrigo Silva",
        "jobTitle": "Engenheiro de Peças para Empilhadeiras e Diretor Técnico",
        "url": `${baseUrl}/sobre`,
        "image": {
          "@type": "ImageObject",
          "url": `${baseUrl}/images/team/rodrigo-silva.jpg`
        },
        "sameAs": [
          "https://www.linkedin.com/in/rodrigosilva-myaparts"
        ],
        "alumniOf": "Universidade de São Paulo",
        "worksFor": {
          "@id": `${baseUrl}/#organization`
        },
        "description": "Rodrigo Silva é um engenheiro com mais de 15 anos de experiência no setor de máquinas industriais, especializado em sistemas hidráulicos e mecânicos para empilhadeiras. Como Diretor Técnico da MYA PARTS, ele é responsável por garantir a qualidade e a inovação dos produtos oferecidos, contribuindo ativamente para a criação de conteúdo técnico e guias de manutenção."
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faqpage`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que são peças para empilhadeiras e por que são importantes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Peças para empilhadeiras são componentes essenciais que garantem o funcionamento, a segurança e a eficiência desses equipamentos de movimentação de carga. Elas incluem desde itens mecânicos, elétricos e hidráulicos até filtros e pneus. A escolha de peças de qualidade é crucial para prolongar a vida útil da máquina, prevenir falhas e assegurar a segurança operacional."
            }
          },
          {
            "@type": "Question",
            "name": "Como a MYA PARTS garante a qualidade e originalidade de suas peças?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A MYA PARTS trabalha exclusivamente com fornecedores renomados e peças de fabricantes OEM (Original Equipment Manufacturer) ou equivalentes de alta qualidade, que passam por rigorosos testes e certificações. Nossa equipe técnica especializada verifica a procedência e a conformidade de cada componente, oferecendo garantia e suporte para a total satisfação e segurança de nossos clientes."
            }
          },
          {
            "@type": "Question",
            "name": "Quais marcas de empilhadeiras a MYA PARTS atende?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A MYA PARTS oferece um vasto catálogo de peças e componentes para as principais marcas de empilhadeiras do mercado, incluindo (mas não limitado a) Hyster, Yale, Toyota, Clark, Mitsubishi, Still, Linde e Komatsu. Nosso objetivo é ser a solução completa para sua frota, independentemente da marca do seu equipamento."
            }
          },
          {
            "@type": "Question",
            "name": "A MYA PARTS oferece suporte técnico e consultoria na escolha de peças?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, a MYA PARTS conta com uma equipe de engenheiros e técnicos altamente qualificados, prontos para oferecer suporte técnico especializado e consultoria personalizada. Ajudamos nossos clientes a identificar as peças corretas para cada modelo e necessidade, garantindo compatibilidade e performance ideais, além de orientações sobre manutenção preventiva."
            }
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "name": "MYA Parts",
        "url": baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/busca?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        {/* Global JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        <Header />
        <main className="flex-1 w-full bg-industrial-100">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        {/* <Chatbot /> */}
      </body>
    </html>
  );
}
