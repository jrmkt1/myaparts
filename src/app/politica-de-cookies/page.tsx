import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Política de Cookies | MYA Parts",
    description: "Saiba como o site MYA Parts utiliza cookies, para que servem e como você pode gerenciá-los conforme a LGPD.",
};

const cookieTable = [
    {
        name: "mya_cookie_consent",
        type: "Essencial",
        purpose: "Armazena a preferência de consentimento de cookies do usuário (aceito/recusado).",
        duration: "1 ano",
        provider: "myaparts.com.br",
    },
    {
        name: "next-auth.session-token",
        type: "Essencial",
        purpose: "Autenticação segura de sessão no painel administrativo (NextAuth.js).",
        duration: "Sessão / 30 dias",
        provider: "myaparts.com.br",
    },
    {
        name: "__vercel_*",
        type: "Técnico",
        purpose: "Cookies internos da plataforma de hospedagem Vercel para roteamento e edge network.",
        duration: "Sessão",
        provider: "Vercel Inc.",
    },
    {
        name: "_ga, _ga_*",
        type: "Analítico (opcional)",
        purpose: "Medição de tráfego anônimo: número de visitantes, páginas vistas e comportamento de navegação. Ativado somente com consentimento.",
        duration: "2 anos",
        provider: "Google Analytics",
    },
];

const sections = [
    {
        title: "O que são cookies?",
        content: `Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou celular) quando você acessa um site. Eles permitem que o site reconheça o seu dispositivo em visitas subsequentes e lembrem de preferências ou sessões ativas.

Cookies não são programas, não acessam dados do seu computador além do que foi configurado e não provocam danos.`,
    },
    {
        title: "Como usamos os cookies",
        content: `O site MYA Parts utiliza cookies para:

• **Funcionalidade essencial**: manter sessões de usuário autenticado (área administrativa).
• **Preferências do usuário**: lembrar a resposta ao banner de consentimento de cookies.
• **Análise estatística** (com consentimento): entender como os visitantes navegam pelo site para melhorar a experiência (ex.: quais páginas são mais acessadas, tempo médio de visita).

Não utilizamos cookies para exibir anúncios personalizados nem vendemos dados de navegação a terceiros.`,
    },
    {
        title: "Gerenciamento e revogação",
        content: `Você tem controle total sobre os cookies:

**No nosso site**: Ao recusar o banner de cookies, apenas os cookies essenciais serão ativados. Para alterar sua preferência, limpe os cookies do seu navegador — o banner de consentimento reaparecerá.

**No navegador**: Você pode configurar seu navegador para bloquear ou excluir cookies a qualquer momento. A desativação de cookies essenciais pode comprometer funcionalidades do site.

• **Chrome**: Configurações → Privacidade e segurança → Cookies
• **Firefox**: Preferências → Privacidade e segurança
• **Safari**: Ajustes → Safari → Privacidade
• **Edge**: Configurações → Cookies e permissões do site`,
    },
    {
        title: "Cookies de terceiros",
        content: `Alguns cookies listados na tabela são definidos por provedores externos (Google, Vercel). Esses provedores possuem suas próprias políticas de privacidade:

• **Google**: policies.google.com/privacy
• **Vercel**: vercel.com/legal/privacy-policy

Somente ativamos cookies analíticos de terceiros com o seu consentimento expresso.`,
    },
    {
        title: "Base legal — LGPD",
        content: `O uso de cookies neste site observa as seguintes bases legais da LGPD (Lei nº 13.709/2018):

• **Cookies essenciais**: "execução de contrato" (art. 7º, V) e "legítimo interesse" (art. 7º, IX) — necessários para o funcionamento básico do serviço.
• **Cookies analíticos**: "consentimento" do titular (art. 7º, I) — ativados apenas após aceite no banner.

O consentimento pode ser revogado a qualquer momento, sem que isso prejudique a legalidade do tratamento realizado anteriormente.`,
    },
    {
        title: "Alterações nesta política",
        content: `Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças tecnológicas ou legais. Sempre indicaremos a data da última atualização. Em caso de mudanças relevantes, o banner de consentimento será reapresentado.`,
    },
];

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-industrial-50 font-sans">
            {/* Header hero */}
            <div className="bg-industrial-900 text-white py-12 md:py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                            <Cookie size={18} className="text-[#b0bec5]" />
                        </div>
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#b0bec5]">Privacidade · Cookies</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                        Política de Cookies
                    </h1>
                    <p className="text-industrial-400 text-base leading-relaxed max-w-2xl">
                        Transparência total sobre como usamos cookies neste site, com base nas exigências da LGPD (Lei nº 13.709/2018).
                    </p>
                    <p className="mt-4 text-xs text-industrial-500 font-medium">
                        Última atualização: 03 de março de 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-industrial-500 hover:text-industrial-900 transition-colors mb-8"
                >
                    <ArrowLeft size={14} />
                    Voltar ao início
                </Link>

                {/* Cookie table */}
                <div className="bg-white rounded-2xl border border-industrial-200 p-6 md:p-8 mb-8">
                    <h2 className="text-lg font-extrabold text-industrial-900 mb-5 pb-3 border-b border-industrial-100">
                        Tabela de Cookies Utilizados
                    </h2>
                    <div className="overflow-x-auto -mx-2">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-industrial-100">
                                    <th className="text-left py-2.5 px-3 text-[11px] font-extrabold uppercase tracking-widest text-industrial-400">Nome</th>
                                    <th className="text-left py-2.5 px-3 text-[11px] font-extrabold uppercase tracking-widest text-industrial-400">Tipo</th>
                                    <th className="text-left py-2.5 px-3 text-[11px] font-extrabold uppercase tracking-widest text-industrial-400">Finalidade</th>
                                    <th className="text-left py-2.5 px-3 text-[11px] font-extrabold uppercase tracking-widest text-industrial-400">Duração</th>
                                    <th className="text-left py-2.5 px-3 text-[11px] font-extrabold uppercase tracking-widest text-industrial-400">Provedor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cookieTable.map((row, i) => (
                                    <tr key={row.name} className={`border-b border-industrial-100 last:border-0 ${i % 2 === 0 ? "" : "bg-industrial-50"}`}>
                                        <td className="py-3 px-3 font-mono text-xs text-industrial-700 whitespace-nowrap">{row.name}</td>
                                        <td className="py-3 px-3">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${row.type === "Essencial"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : row.type === "Técnico"
                                                        ? "bg-industrial-100 text-industrial-600"
                                                        : "bg-amber-50 text-amber-700"
                                                }`}>
                                                {row.type}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-industrial-600 text-xs leading-relaxed max-w-xs">{row.purpose}</td>
                                        <td className="py-3 px-3 text-industrial-600 text-xs whitespace-nowrap">{row.duration}</td>
                                        <td className="py-3 px-3 text-industrial-600 text-xs whitespace-nowrap">{row.provider}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section) => (
                        <section key={section.title} className="bg-white rounded-2xl border border-industrial-200 p-6 md:p-8">
                            <h2 className="text-lg font-extrabold text-industrial-900 mb-4 pb-3 border-b border-industrial-100">
                                {section.title}
                            </h2>
                            <div className="text-sm text-industrial-600 leading-relaxed space-y-3">
                                {section.content.split("\n").map((line, i) =>
                                    line.trim() ? (
                                        <p key={i} dangerouslySetInnerHTML={{
                                            __html: line
                                                .replace(/\*\*(.*?)\*\*/g, "<strong class=\"text-industrial-900 font-semibold\">$1</strong>")
                                                .replace(/^•/, "—"),
                                        }} />
                                    ) : null
                                )}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Footer nav */}
                <div className="mt-10 pt-8 border-t border-industrial-200 flex flex-wrap items-center gap-4 text-sm text-industrial-500">
                    <Link href="/politica-de-privacidade" className="font-bold text-industrial-700 hover:text-industrial-900 underline underline-offset-2 transition-colors">
                        ← Política de Privacidade
                    </Link>
                    <Link href="/" className="hover:text-industrial-900 transition-colors">
                        Voltar ao site
                    </Link>
                </div>
            </div>
        </div>
    );
}
