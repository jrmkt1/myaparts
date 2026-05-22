import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Solicitar Orçamento | MYA Parts",
    description: "Finalize sua solicitação de cotação de peças para empilhadeiras. Insira os dados da sua empresa para retorno rápido.",
    alternates: {
        canonical: "/orcamento",
    },
    robots: {
        index: false,
        follow: true,
    }
};

export default function OrcamentoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
