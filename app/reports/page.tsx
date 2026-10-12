"use client";



import {Toaster} from "sonner";
import Subheader from "@/components/ui/subheader";
import {formatCurrentDate} from "@/lib/dates";

export default function ReportPage() {
    return (
        <div className="min-h-screen bg-[#f3f6f5] text-[#18302e]">
            <Toaster position="top-right" richColors/>
            <div className="mx-auto flex max-w-[1600px]">
                <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                    <Subheader date={formatCurrentDate()} title={"Incidencias"} description={"Se muestran las incidencias"}/>
                </main>
            </div>
        </div>
    );
}