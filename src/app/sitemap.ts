import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export const revalidate = 3600; // Cache sitemap for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://myaparts.com.br";

  // Static routes
  const staticRoutes = [
    "",
    "/produtos",
    "/sobre",
    "/contato",
    "/como-orcamento",
    "/politica-de-privacidade",
    "/politica-de-cookies"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic product routes from database
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    productRoutes = products.map((product) => ({
      url: `${baseUrl}/produto/${product.id}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Erro ao carregar produtos para o sitemap:", error);
  }

  return [...staticRoutes, ...productRoutes];
}
