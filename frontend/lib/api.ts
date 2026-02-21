// lib/api.ts
import type { StartupFormValues } from "./validationSchema";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function analyzeStartup(payload: StartupFormValues) {
    const res = await fetch(`${BASE_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
            `Backend error (${res.status}). ${text || "Check backend server is running & CORS."
            }`
        );
    }

    return res.json();
}