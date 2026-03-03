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
  title: "MYA PARTS | Peças para Empilhadeiras",
  description: "Catálogo completo de peças para empilhadeiras. Motor, Freio, Hidráulico e mais para Toyota, Hyster, Yale.",
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

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <Header />
        <main className="flex-1 w-full bg-industrial-100">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
