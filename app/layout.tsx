import type {Metadata} from "next";
import "./globals.css";
import { MenuProvider } from '@/context/MenuContext'
import {AsideNavigator} from "@/components/ui/aside-navigator";
import Header from "@/components/ui/header";

export const metadata: Metadata = {
    title: "TrazaSan · Residuos hospitalarios",
    description: "Control y trazabilidad de residuos sanitarios para hospitales.",
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
    },
};
export default function RootLayout({children,}: { children: React.ReactNode; }) {
    return (
        <html lang="es">
        <body>
        <MenuProvider>
            {/*  ¡AQUÍ SÍ! Todo el contenido visual debe ir dentro del body */}
            <Header></Header>
                <div className="flex">
                    <AsideNavigator/>
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
        </MenuProvider>
        </body>
        </html>
    );
}
