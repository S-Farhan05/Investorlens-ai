// lib/validationSchema.ts
import { z } from "zod";

export const startupSchema = z
    .object({
        // Step 1 — Business Overview
        startup_name: z.string().min(1, "Startup name is required"),
        problem_statement: z
            .string()
            .min(150, "Problem statement must be at least 150 characters"),
        solution_description: z
            .string()
            .min(150, "Solution description must be at least 150 characters"),
        unique_value_proposition: z
            .string()
            .min(1, "Unique value proposition is required"),
        target_customer_segment: z
            .string()
            .min(1, "Target customer segment is required"),

        // Step 2 — Market
        estimated_market_size: z
            .coerce
            .number()
            .positive("Estimated market size must be greater than 0"),
        geographic_focus: z.string().min(1, "Geographic focus is required"),
        competitors: z.array(z.string().min(1)),
        market_growth_rate: z
            .preprocess(
                (val) => (val === "" || val === null || val === undefined ? 0 : Number(val)),
                z.number().min(0, "Market growth rate cannot be negative")
            ),

        // Step 3 — Revenue & Financial
        revenue_model: z.string().min(1, "Revenue model is required"),
        pricing_strategy: z.string().min(1, "Pricing strategy is required"),
        estimated_monthly_revenue: z
            .coerce
            .number()
            .min(0, "Estimated monthly revenue cannot be negative"),
        estimated_burn_rate: z
            .coerce
            .number()
            .min(0, "Estimated burn rate cannot be negative"),
        funding_stage: z.string().min(1, "Funding stage is required"),
        runway_duration_months: z
            .coerce
            .number()
            .int("Runway must be a whole number (months)")
            .min(0, "Runway duration cannot be negative"),

        // Step 4 — Team & Execution
        number_of_founders: z
            .coerce
            .number()
            .int("Number of founders must be a whole number")
            .min(1, "There must be at least 1 founder"),
        founders_background: z.string().min(1, "Founders background is required"),
        years_of_experience: z
            .coerce
            .number()
            .int("Years of experience must be a whole number")
            .min(0, "Years of experience cannot be negative"),
        team_ratio: z.string().min(1, "Team ratio is required"),
        previous_startup_experience: z.coerce.boolean(),
    })
    .superRefine((data, ctx) => {
        // Logical consistency check (requested in doc)
        if (data.estimated_burn_rate > data.estimated_monthly_revenue) {
            ctx.addIssue({
                code: "custom",
                path: ["estimated_burn_rate"],
                message:
                    "Burn rate is higher than monthly revenue. This indicates higher financial risk (confirm values).",
            });
        }
    });

export type StartupFormValues = z.infer<typeof startupSchema>;

export const defaultValues: StartupFormValues = {
    startup_name: "",
    problem_statement: "",
    solution_description: "",
    unique_value_proposition: "",
    target_customer_segment: "",

    estimated_market_size: 0,
    geographic_focus: "",
    competitors: [],
    market_growth_rate: 0,

    revenue_model: "",
    pricing_strategy: "",
    estimated_monthly_revenue: 0,
    estimated_burn_rate: 0,
    funding_stage: "",
    runway_duration_months: 0,

    number_of_founders: 1,
    founders_background: "",
    years_of_experience: 0,
    team_ratio: "",
    previous_startup_experience: false,
};