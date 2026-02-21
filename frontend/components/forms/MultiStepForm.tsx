"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { startupSchema, defaultValues, type StartupFormValues } from "@/lib/validationSchema";
import { analyzeStartup } from "@/lib/api";

type Props = {
    onResult?: (data: any) => void;
};

const steps = ["Business", "Market", "Financial", "Team"] as const;

function FieldError({ msg }: { msg?: string }) {
    if (!msg) return null;
    return <p className="mt-1 text-sm text-red-600">{msg}</p>;
}

export default function MultiStepForm({ onResult }: Props) {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        trigger,
    } = useForm<StartupFormValues>({
        resolver: zodResolver(startupSchema) as any,
        defaultValues,
        mode: "onTouched",
    });

    const competitors = watch("competitors");

    const stepFields: Record<number, (keyof StartupFormValues)[]> = useMemo(
        () => ({
            0: [
                "startup_name",
                "problem_statement",
                "solution_description",
                "unique_value_proposition",
                "target_customer_segment",
            ],
            1: ["estimated_market_size", "geographic_focus", "competitors", "market_growth_rate"],
            2: [
                "revenue_model",
                "pricing_strategy",
                "estimated_monthly_revenue",
                "estimated_burn_rate",
                "funding_stage",
                "runway_duration_months",
            ],
            3: [
                "number_of_founders",
                "founders_background",
                "years_of_experience",
                "team_ratio",
                "previous_startup_experience",
            ],
        }),
        []
    );

    async function nextStep() {
        setApiError(null);
        const ok = await trigger(stepFields[step], { shouldFocus: true });
        if (!ok) return;
        setStep((s) => Math.min(s + 1, steps.length - 1));
    }

    function prevStep() {
        setApiError(null);
        setStep((s) => Math.max(s - 1, 0));
    }

    const onSubmit = async (data: StartupFormValues) => {
        setIsSubmitting(true);
        setApiError(null);
        try {
            const result = await analyzeStartup(data);
            onResult?.(result);
        } catch (e: any) {
            setApiError(e?.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Competitors helpers
    const [competitorInput, setCompetitorInput] = useState("");
    const addCompetitor = () => {
        const name = competitorInput.trim();
        if (!name) return;
        setValue("competitors", [...(competitors || []), name], { shouldValidate: true });
        setCompetitorInput("");
    };
    const removeCompetitor = (idx: number) => {
        const updated = (competitors || []).filter((_, i) => i !== idx);
        setValue("competitors", updated, { shouldValidate: true });
    };

    return (
        <div className="w-full max-w-3xl rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">InvestorLens AI — Startup Analysis</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Step {step + 1} of {steps.length}: <span className="font-medium">{steps[step]}</span>
                </p>

                <div className="mt-4 flex gap-2">
                    {steps.map((label, i) => (
                        <div
                            key={label}
                            className={`h-2 flex-1 rounded-full ${i <= step ? "bg-black" : "bg-gray-200"
                                }`}
                            title={label}
                        />
                    ))}
                </div>
            </div>

            {apiError && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* STEP 1 */}
                {step === 0 && (
                    <section className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Startup Name</label>
                            <input
                                className="mt-1 w-full rounded-lg border px-3 py-2"
                                placeholder="e.g., InvestorLens AI"
                                {...register("startup_name")}
                            />
                            <FieldError msg={errors.startup_name?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Problem Statement <span className="text-xs text-gray-500">(min 150 chars)</span>
                            </label>
                            <textarea
                                className="mt-1 w-full rounded-lg border px-3 py-2"
                                rows={5}
                                {...register("problem_statement")}
                            />
                            <FieldError msg={errors.problem_statement?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Solution Description <span className="text-xs text-gray-500">(min 150 chars)</span>
                            </label>
                            <textarea
                                className="mt-1 w-full rounded-lg border px-3 py-2"
                                rows={5}
                                {...register("solution_description")}
                            />
                            <FieldError msg={errors.solution_description?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Unique Value Proposition</label>
                            <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("unique_value_proposition")} />
                            <FieldError msg={errors.unique_value_proposition?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Target Customer Segment</label>
                            <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("target_customer_segment")} />
                            <FieldError msg={errors.target_customer_segment?.message} />
                        </div>
                    </section>
                )}

                {/* STEP 2 */}
                {step === 1 && (
                    <section className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Estimated Market Size</label>
                            <input
                                type="number"
                                className="mt-1 w-full rounded-lg border px-3 py-2"
                                placeholder="e.g., 5000000"
                                {...register("estimated_market_size")}
                            />
                            <FieldError msg={errors.estimated_market_size?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Geographic Focus</label>
                            <input className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="e.g., Pakistan / Global" {...register("geographic_focus")} />
                            <FieldError msg={errors.geographic_focus?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Competitors</label>
                            <div className="mt-1 flex gap-2">
                                <input
                                    className="w-full rounded-lg border px-3 py-2"
                                    value={competitorInput}
                                    onChange={(e) => setCompetitorInput(e.target.value)}
                                    placeholder="Type competitor name and Add"
                                />
                                <button
                                    type="button"
                                    onClick={addCompetitor}
                                    className="rounded-lg bg-black px-4 py-2 text-white"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {(competitors || []).map((c, idx) => (
                                    <span
                                        key={`${c}-${idx}`}
                                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
                                    >
                                        {c}
                                        <button
                                            type="button"
                                            className="text-gray-500 hover:text-black"
                                            onClick={() => removeCompetitor(idx)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <FieldError msg={(errors.competitors as any)?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Market Growth Rate</label>
                            <input
                                type="number"
                                className="mt-1 w-full rounded-lg border px-3 py-2"
                                placeholder="e.g., 12"
                                {...register("market_growth_rate")}
                            />
                            <FieldError msg={errors.market_growth_rate?.message} />
                        </div>
                    </section>
                )}

                {/* STEP 3 */}
                {step === 2 && (
                    <section className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Revenue Model</label>
                            <select className="mt-1 w-full rounded-lg border px-3 py-2" {...register("revenue_model")}>
                                <option value="">Select</option>
                                <option value="Subscription">Subscription</option>
                                <option value="Commission">Commission</option>
                                <option value="Ads">Ads</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                            <FieldError msg={errors.revenue_model?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Pricing Strategy</label>
                            <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("pricing_strategy")} />
                            <FieldError msg={errors.pricing_strategy?.message} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium">Estimated Monthly Revenue</label>
                                <input type="number" className="mt-1 w-full rounded-lg border px-3 py-2" {...register("estimated_monthly_revenue")} />
                                <FieldError msg={errors.estimated_monthly_revenue?.message} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Estimated Burn Rate</label>
                                <input type="number" className="mt-1 w-full rounded-lg border px-3 py-2" {...register("estimated_burn_rate")} />
                                <FieldError msg={errors.estimated_burn_rate?.message} />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium">Funding Stage</label>
                                <input className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="e.g., Pre-seed / Seed / Series A" {...register("funding_stage")} />
                                <FieldError msg={errors.funding_stage?.message} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Runway Duration (months)</label>
                                <input type="number" className="mt-1 w-full rounded-lg border px-3 py-2" {...register("runway_duration_months")} />
                                <FieldError msg={errors.runway_duration_months?.message} />
                            </div>
                        </div>
                    </section>
                )}

                {/* STEP 4 */}
                {step === 3 && (
                    <section className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium">Number of Founders</label>
                                <input type="number" className="mt-1 w-full rounded-lg border px-3 py-2" {...register("number_of_founders")} />
                                <FieldError msg={errors.number_of_founders?.message} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Years of Experience</label>
                                <input type="number" className="mt-1 w-full rounded-lg border px-3 py-2" {...register("years_of_experience")} />
                                <FieldError msg={errors.years_of_experience?.message} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Founders Background</label>
                            <textarea className="mt-1 w-full rounded-lg border px-3 py-2" rows={4} {...register("founders_background")} />
                            <FieldError msg={errors.founders_background?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Technical vs Business Team Ratio</label>
                            <input className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="e.g., 60% Tech / 40% Business" {...register("team_ratio")} />
                            <FieldError msg={errors.team_ratio?.message} />
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4" {...register("previous_startup_experience")} />
                            <label className="text-sm font-medium">Previous Startup Experience</label>
                        </div>
                        <FieldError msg={errors.previous_startup_experience?.message} />
                    </section>
                )}

                <div className="flex items-center justify-between pt-2">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={step === 0 || isSubmitting}
                        className="rounded-lg border px-4 py-2 disabled:opacity-50"
                    >
                        Back
                    </button>

                    {step < steps.length - 1 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={isSubmitting}
                            className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
                        >
                            {isSubmitting ? "Analyzing..." : "Analyze Startup"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}