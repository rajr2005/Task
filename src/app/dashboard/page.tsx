"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowUpRight, PhoneCall, Users } from "lucide-react";
import { getCustomers } from "@/lib/customer-api";

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Awaited<ReturnType<typeof getCustomers>>>([]);
  useEffect(() => { getCustomers().then(setCustomers); }, []);
  const stats = useMemo(() => {
    const active = customers.filter(customer => customer.status === "Active").length;
    const contactedThisWeek = customers.filter(customer => customer.date >= "2026-08-18").length;
    return [{ label: "Total Customers", value: customers.length, trend: "+12.4%", icon: Users, color: "text-cyan-300" }, { label: "Active Leads", value: active, trend: "+5.9%", icon: Activity, color: "text-orange-300" }, { label: "Contacted This Week", value: contactedThisWeek, trend: "+8.1%", icon: PhoneCall, color: "text-rose-300" }];
  }, [customers]);

  return <main className="min-h-screen bg-[#08111f] text-slate-100"><header className="border-b border-slate-800 bg-[#0d1728]"><div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4"><div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500 font-bold">C</div><b>Cortex CRM</b><nav className="ml-4 flex gap-4 text-sm"><Link className="text-blue-300" href="/dashboard">Dashboard</Link><Link className="text-slate-400 hover:text-white" href="/">Customers</Link></nav><span className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-violet-500 text-xs">AR</span></div></header><div className="mx-auto max-w-7xl px-5 py-9"><p className="text-sm font-medium text-blue-400">OVERVIEW</p><div className="mt-1 flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">Dashboard</h1><p className="mt-2 text-slate-400">A snapshot of your customer relationships.</p></div><Link href="/" className="rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold">Manage customers</Link></div><section className="mt-8 grid gap-5 md:grid-cols-3">{stats.map(({ label, value, trend, icon: Icon, color }) => <article key={label} className="rounded-xl border border-slate-800 bg-[#121d2e] p-5 shadow-xl shadow-black/10"><div className="flex items-start justify-between"><span className={`grid h-11 w-11 place-items-center rounded-lg bg-slate-800 ${color}`}><Icon size={21}/></span><span className="flex items-center gap-1 text-xs font-semibold text-emerald-300"><ArrowUpRight size={14}/>{trend}</span></div><p className="mt-6 text-3xl font-bold">{value.toLocaleString()}</p><p className="mt-1 text-sm text-slate-400">{label}</p><p className="mt-4 text-xs text-slate-500">Compared with last period</p></article>)}</section><section className="mt-7 rounded-xl border border-slate-800 bg-[#0d1728] p-6"><h2 className="text-lg font-bold">Recent activity</h2><p className="mt-1 text-sm text-slate-400">Your latest customer interactions.</p><div className="mt-5 divide-y divide-slate-800">{customers.slice(0, 6).map(customer => <div key={customer.id} className="flex items-center justify-between py-4"><div><p className="font-medium">{customer.name}</p><p className="text-sm text-slate-400">{customer.company} · {customer.notes}</p></div><span className="text-sm text-slate-500">{customer.date}</span></div>)}</div></section></div></main>;
}
