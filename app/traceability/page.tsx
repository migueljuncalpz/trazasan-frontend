"use client";

import {FormEvent, useMemo, useState} from "react";
import {Toaster} from "@/components/ui/sonner";
import {
    AlertTriangle, ArrowUpRight,
    BarChart3,
    Bell,
    Boxes,
    ChevronRight, CircleGauge, ClipboardList, FileCheck2,
    Hospital,
    Menu, QrCode,
    Search,
    ShieldCheck, Truck,
} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import {Input} from "@/components/ui/input";

const nav = [
    {label: "Resumen", icon: CircleGauge}, {label: "Trazabilidad", icon: QrCode},
    {label: "Retiradas", icon: Truck}, {label: "Incidencias", icon: AlertTriangle},
    {label: "Archivo GaIA", icon: FileCheck2},
];

export default function TraceabilityPage() {
    const [activeNav, setActiveNav] = useState("Resumen");
    const [open, setOpen] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const [query, setQuery] = useState("");
    const [hasLocalData, setHasLocalData] = useState(false);

    return (
        <div className="min-h-screen bg-[#f3f6f5] text-[#18302e]">
            <Toaster position="top-right" richColors/>
            <div className="mx-auto flex max-w-[1600px]">
                <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                    <div><p className="mb-1 text-xs font-bold uppercase tracking-[.12em] text-[#7a918d]">Jueves, 1
                        de
                        octubre</p><h1
                        className="text-2xl font-bold tracking-tight text-[#123d3a] sm:text-[30px]">Control de
                        residuos</h1><p className="mt-1 text-sm text-[#718581]">Visión operativa del hospital y su
                        trazabilidad
                        ambiental.</p>
                    </div>
                </main>
            </div>
        </div>
    );
}

function Metric({title, value, note, icon: Icon, tone}: {
    title: string;
    value: string;
    note: string;
    icon: typeof Boxes;
    tone: string
}) {
    const tones: Record<string, string> = {
        teal: "bg-[#e4f3ef] text-[#08766f]",
        amber: "bg-[#fff0d5] text-[#b26b10]",
        green: "bg-[#e8f5eb] text-[#3b7d50]",
        red: "bg-[#fee9e7] text-[#bd5149]"
    };
    return <div className="rounded-2xl border border-[#dce5e2] bg-white p-5 shadow-[0_8px_28px_rgba(12,65,61,.04)]">
        <div className="flex items-start justify-between">
            <div className={`rounded-xl p-2.5 ${tones[tone]}`}><Icon className="h-5 w-5"/></div>
            <button className="rounded-lg p-1.5 text-[#94a39f] hover:bg-[#f2f6f5]" aria-label={`Detalles de ${title}`}>
                <ArrowUpRight className="h-4 w-4"/></button>
        </div>
        <div className="mt-4 text-sm text-[#6b807c]">{title}</div>
        <div className="mt-1 text-[26px] font-bold tracking-tight text-[#183d3a]">{value}</div>
        <div className="mt-2 text-xs text-[#859692]">{note}</div>
    </div>;
}
