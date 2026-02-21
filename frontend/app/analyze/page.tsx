"use client";
import MultiStepForm from "@/components/forms/MultiStepForm";

export default function AnalyzePage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <MultiStepForm
                    onResult={(data) => {
                        // For now, just log result.
                        // Later: route to dashboard page, or render charts.
                        console.log("ANALYSIS RESULT:", data);
                        alert("Analysis received! Check console for response JSON.");
                    }}
                />
            </div>
        </main>
    );
}