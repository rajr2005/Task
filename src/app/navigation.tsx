"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Navigation() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); router.push(`/?search=${encodeURIComponent(query)}`); };
  return <nav className="border-b border-slate-800 bg-[#0d1728]"><div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-3"><Link href="/dashboard" className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500 text-sm font-bold">C</Link><span className="mr-3 font-semibold">Cortex CRM</span><Link href="/dashboard" className="rounded-md px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">Dashboard</Link><Link href="/" className="rounded-md px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">Customers</Link><form onSubmit={submit} className="ml-auto hidden items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 md:flex"><Search size={15} className="text-slate-400"/><input value={query} onChange={event => setQuery(event.target.value)} className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Search customers..."/></form><span className="grid h-8 w-8 place-items-center rounded-full bg-violet-500 text-xs">AR</span></div></nav>;
}
