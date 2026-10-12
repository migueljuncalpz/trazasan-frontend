// components/AsideNavigator.tsx
"use client";

import { AlertTriangle, CircleGauge, FileCheck2, Hospital, QrCode, ShieldCheck, Truck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {usePathname, useRouter} from "next/navigation";
import { useMenu } from "@/context/MenuContext"; // 👈 1. Importamos el hook global

const nav = [
    { label: "Resumen", icon: CircleGauge, page: "" },
    { label: "Trazabilidad", icon: QrCode, page: "traceability" },
    { label: "Hospital", icon: Hospital, page: "profile" },
    { label: "Retiradas", icon: Truck, page: "traceability" },
    { label: "Incidencias", icon: AlertTriangle, page: "reports" },
    { label: "Archivo GaIA", icon: FileCheck2, page: "traceability" },
];

export default function AsideNavigator() {
    const { isOpen, closeMenu } = useMenu();
    const pathname = usePathname();
    const router = useRouter();


    const navigateToPage = (pageName: string) => {
        router.push('/' + pageName);
    };

    return (
        <>
            {/* 3. AGREGADO: Fondo oscuro opcional para cerrar el menú en móvil haciendo click fuera */}
            {isOpen && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 z-40 bg-black/20 lg:hidden"
                />
            )}

            <aside
                id="main-navigation"
                className={`${isOpen ? "fixed inset-y-16 left-0 z-50 flex" : "hidden"}
                w-64 flex-col border-r border-[#dce5e2] bg-white p-4
                lg:sticky lg:top-0 lg:z-0 lg:flex lg:h-[calc(100vh-4rem)]`}
            >
                <div className="mb-3 px-3 pt-2 text-[11px] font-bold uppercase tracking-[.12em] text-[#7f9490]">
                    Operaciones
                </div>
                <nav className="space-y-1">
                    {nav.map(({ label, icon: Icon, page }) => {
                        const route = page ? `/${page}` : "/";
                        const isActive = pathname === route;

                        return (
                            <button
                                key={label}
                                type="button"
                                onClick={() => {
                                    closeMenu();
                                    navigateToPage(page);
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${isActive ? "bg-[#e4f3ef] text-[#075d58]" : "text-[#5f7470] hover:bg-[#f4f7f6]"}`}>
                                <Icon className="h-4.5 w-4.5"/>
                                {label}
                                {label === "Incidencias" && (
                                    <span className="ml-auto rounded-full bg-[#fff1dd] px-2 py-0.5 text-[11px] font-bold text-[#a05d05]">2</span>
                                )}
                            </button>
                        );
                    })}
                </nav>
                <div className="mt-auto rounded-2xl border border-[#d9e7e3] bg-[#f4faf8] p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <ShieldCheck className="h-4 w-4 text-[#08766f]"/>Cumplimiento
                    </div>
                    <div className="text-xs leading-5 text-[#667c78]">
                        Archivo cronológico actualizado al 30 de septiembre.
                    </div>
                    <Progress value={88} className="mt-3 h-1.5 bg-[#d8e7e3]"/>
                    <button className="mt-3 text-xs font-semibold text-[#08766f]">Ver preparación GaIA</button>
                </div>
            </aside>
        </>
    );
}

export { AsideNavigator };
