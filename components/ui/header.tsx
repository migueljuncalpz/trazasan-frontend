// components/Header.tsx
"use client";

import { Bell, Hospital, Menu } from "lucide-react";
import { useMenu } from '@/context/MenuContext';
import {getTrazasanPlatformStatus} from '@/lib/api/trazasan'
import {useEffect, useState} from "react";

export default function Header() {
    // 1. CORRECCIÓN: Llamamos al hook aquí arriba para extraer la función modificadora
    const { isOpen, toggleMenu } = useMenu();
    const [platformOnline, setPlatformOnline] =
        useState<boolean | null>(null);

    useEffect(() => {
        let mounted = true;

        getTrazasanPlatformStatus()
            .then((statusCode) => {
                if (mounted) {
                    setPlatformOnline(statusCode === 200);
                }
            })
            .catch(() => {
                if (mounted) {
                    setPlatformOnline(false);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    const statusText =
        platformOnline === null
            ? "Comprobando sistema"
            : platformOnline
                ? "Sistema operativo"
                : "Sistema inoperativo";

    const statusColor =
        platformOnline === null
            ? "bg-amber-400"
            : platformOnline
                ? "bg-emerald-400"
                : "bg-red-400";

    return (
        <header
            className="sticky top-0 z-30 flex h-16 items-center border-b border-white/10 bg-[#073c3b] px-4 text-white shadow-sm lg:px-7">

            {/* 2. CORRECCIÓN: Modificamos el onClick para alternar (toggle) el estado global */}
            <button
                type="button"
                className="mr-3 cursor-pointer rounded-lg p-2 hover:bg-white/10 lg:hidden"
                onClick={toggleMenu}
                aria-label="Abrir navegación"
                aria-controls="main-navigation"
                aria-expanded={isOpen}
            >
                <Menu className="h-5 w-5"/>
            </button>

            <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4b942] text-[#073c3b]">
                    <Hospital className="h-5 w-5"/>
                </div>
                <div>
                    <div className="text-[17px] font-bold tracking-tight">TrazaSan</div>
                    <div className="-mt-1 text-[11px] text-emerald-100/70">Hospital de referencia</div>
                </div>
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <div className="hidden items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-emerald-50 sm:flex">
                    <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                    {statusText}
                </div>
                <button className="relative rounded-lg p-2 hover:bg-white/10" aria-label="Notificaciones">
                    <Bell className="h-5 w-5"/>
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#f4b942]"/>
                </button>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#cde7df] text-sm font-bold text-[#073c3b]">
                    MR
                </div>
            </div>
        </header>
    )
}

export { Header };
