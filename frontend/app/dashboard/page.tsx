"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// THE FIX: This line must be exactly like this
export default function Dashboard() {
  const data = {
    failure_probability: 35,
    risk_category: "Medium",
    risk_breakdown: { market_risk: 40, competition_risk: 60, execution_risk: 20, financial_risk: 30 },
    executive_summary: "The startup shows high technical potential but faces stiff competition. Immediate focus on market differentiation is required."
  };

  const chartData = [
    { name: 'Market', value: data.risk_breakdown.market_risk },
    { name: 'Competition', value: data.risk_breakdown.competition_risk },
    { name: 'Execution', value: data.risk_breakdown.execution_risk },
    { name: 'Financial', value: data.risk_breakdown.financial_risk }
  ];

  return (
    <div className="p-10 bg-slate-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">InvestorLens AI Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">Failure Probability</p>
          <p className="text-6xl font-black text-red-600 mt-2">{data.failure_probability}%</p>
          <div className="mt-4 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs w-fit font-bold uppercase">{data.risk_category} Risk</div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-64">
          <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4">Risk Breakdown</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-2">AI Executive Summary</h3>
        <p className="text-slate-600 italic leading-relaxed">"{data.executive_summary}"</p>
      </div>
    </div>
  );
}