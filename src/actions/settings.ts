"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function toggleMaintenanceMode(currentState: boolean) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Não autorizado.");
    }

    await db.systemSetting.upsert({
        where: { key: "MAINTENANCE_MODE" },
        update: { value: currentState ? "false" : "true" },
        create: { key: "MAINTENANCE_MODE", value: "true" }
    });

    // Revalidate everything
    revalidatePath("/", "layout");
}

export async function getMaintenanceMode() {
    const setting = await db.systemSetting.findUnique({
        where: { key: "MAINTENANCE_MODE" }
    });
    return setting?.value === "true";
}
