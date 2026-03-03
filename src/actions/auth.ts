"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(prevState: unknown, formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { error: "Preencha todos os campos" };
        }

        await signIn("credentials", {
            email,
            password,
            redirectTo: "/painel/dashboard",
        });

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "E-mail ou senha inválidos." };
                default:
                    return { error: "Ocorreu um erro no login." };
            }
        }
        throw error; // Let next/navigation redirect throw naturally
    }
}

export async function logoutAction() {
    await signOut({ redirectTo: "/painel/login" });
}
