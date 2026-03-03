"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import Image from "next/image";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, undefined);

    return (
        <div className="min-h-screen bg-industrial-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-xl shadow-xl border border-industrial-200">
                <div>
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/mya-logo.png"
                            alt="MYA Parts Logo"
                            width={220}
                            height={110}
                            className="w-[200px] h-auto object-contain"
                            priority
                        />
                    </div>
                    <p className="mt-2 text-center text-sm text-industrial-400 font-semibold uppercase tracking-widest">
                        Acesso Restrito
                    </p>
                </div>
                <form className="mt-8 space-y-6" action={formAction}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">E-mail</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-industrial-200 placeholder-industrial-400 text-industrial-900 focus:outline-none focus:ring-2 focus:ring-action focus:border-action focus:z-10 sm:text-sm bg-industrial-100"
                                placeholder="E-mail administrador"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-industrial-200 placeholder-industrial-400 text-industrial-900 focus:outline-none focus:ring-2 focus:ring-action focus:border-action focus:z-10 sm:text-sm bg-industrial-100"
                                placeholder="Senha de acesso"
                            />
                        </div>
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-md border border-red-100 text-center">
                            {state.error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-industrial-800 hover:bg-industrial-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-industrial-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                        >
                            {isPending ? "Autenticando..." : "Entrar no Painel"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
