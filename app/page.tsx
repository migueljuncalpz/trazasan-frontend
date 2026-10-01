"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  AlertTriangle, ArrowUpRight, BarChart3, Bell, Boxes, CheckCircle2,
  ChevronRight, CircleGauge, ClipboardList, FileCheck2, Hospital,
  Menu, Plus, QrCode, Search, ShieldCheck, Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type WasteRecord = {
  id: number; containerCode: string; wasteType: string; lerCode: string; unit: string;
  weightKg: number; status: string; risk: string; createdAt: string | number | Date;
};

const demoRecords: WasteRecord[] = [
  { id: -1, containerCode: "BIO-2409-0187", wasteType: "Biosanitario especial", lerCode: "18 01 03*", unit: "UCI", weightKg: 12800, status: "almacenado", risk: "biológico", createdAt: "2026-10-01T08:42:00" },
  { id: -2, containerCode: "CIT-2409-0084", wasteType: "Citotóxico", lerCode: "18 01 08*", unit: "Oncología", weightKg: 6400, status: "retirado", risk: "citotóxico", createdAt: "2026-10-01T07:58:00" },
  { id: -3, containerCode: "PUN-2409-0331", wasteType: "Cortantes y punzantes", lerCode: "18 01 03*", unit: "Urgencias", weightKg: 3200, status: "registrado", risk: "biológico", createdAt: "2026-10-01T07:31:00" },
  { id: -4, containerCode: "QUI-2409-0042", wasteType: "Reactivos químicos", lerCode: "18 01 06*", unit: "Laboratorio", weightKg: 9100, status: "tratado", risk: "químico", createdAt: "2026-09-30T17:12:00" },
];

const wasteMix = [
  { label: "Asimilables a urbanos", value: 46, color: "bg-[#0e7a72]" },
  { label: "Biosanitarios", value: 29, color: "bg-[#33a69b]" },
  { label: "Citotóxicos", value: 11, color: "bg-[#d28b2c]" },
  { label: "Químicos", value: 8, color: "bg-[#6b6f8f]" },
  { label: "Otros", value: 6, color: "bg-[#b8c4c2]" },
];

const nav = [
  { label: "Resumen", icon: CircleGauge }, { label: "Trazabilidad", icon: QrCode },
  { label: "Retiradas", icon: Truck }, { label: "Incidencias", icon: AlertTriangle },
  { label: "Archivo GaIA", icon: FileCheck2 },
];

const statusStyle: Record<string, string> = {
  registrado: "bg-sky-50 text-sky-700 ring-sky-200", almacenado: "bg-amber-50 text-amber-800 ring-amber-200",
  retirado: "bg-violet-50 text-violet-700 ring-violet-200", tratado: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function formatKg(grams: number) { return `${(grams / 1000).toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg`; }

export default function Home() {
  const [records, setRecords] = useState<WasteRecord[]>(demoRecords);
  const [activeNav, setActiveNav] = useState("Resumen");
  const [open, setOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [hasLocalData, setHasLocalData] = useState(false);

  const filtered = useMemo(() => records.filter((record) =>
    `${record.containerCode} ${record.wasteType} ${record.unit} ${record.lerCode}`.toLowerCase().includes(query.toLowerCase())), [records, query]);

  function addRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const weightKg = Number(data.get("weightKg"));
    const record: WasteRecord = {
      id: Date.now(),
      containerCode: String(data.get("containerCode")),
      wasteType: String(data.get("wasteType")),
      lerCode: String(data.get("lerCode")),
      unit: String(data.get("unit")),
      weightKg: Math.round(weightKg * 1000),
      status: "registrado",
      risk: String(data.get("risk")),
      createdAt: new Date().toISOString(),
    };

    setRecords((current) => [record, ...current]);
    setHasLocalData(true);
    setOpen(false);
    toast.success("Contenedor añadido a la demo", {
      description: `${record.containerCode} se conservará hasta que recargues la página.`,
    });
  }

  return (
    <div className="min-h-screen bg-[#f3f6f5] text-[#18302e]">
      <Toaster position="top-right" richColors />
      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-white/10 bg-[#073c3b] px-4 text-white shadow-sm lg:px-7">
        <button className="mr-3 rounded-lg p-2 hover:bg-white/10 lg:hidden" onClick={() => setMobileNav(!mobileNav)} aria-label="Abrir navegación"><Menu className="h-5 w-5" /></button>
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4b942] text-[#073c3b]"><Hospital className="h-5 w-5" /></div>
          <div><div className="text-[17px] font-bold tracking-tight">TrazaSan</div><div className="-mt-1 text-[11px] text-emerald-100/70">Hospital de referencia</div></div>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-xs text-emerald-50 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-400" />Sistema operativo</div>
          <button className="relative rounded-lg p-2 hover:bg-white/10" aria-label="Notificaciones"><Bell className="h-5 w-5" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#f4b942]" /></button>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#cde7df] text-sm font-bold text-[#073c3b]">MR</div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className={`${mobileNav ? "fixed inset-y-16 left-0 z-20 flex" : "hidden"} w-64 flex-col border-r border-[#dce5e2] bg-white p-4 lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)]`}>
          <div className="mb-3 px-3 pt-2 text-[11px] font-bold uppercase tracking-[.12em] text-[#7f9490]">Operaciones</div>
          <nav className="space-y-1">
            {nav.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActiveNav(label); setMobileNav(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${activeNav === label ? "bg-[#e4f3ef] text-[#075d58]" : "text-[#5f7470] hover:bg-[#f4f7f6]"}`}><Icon className="h-[18px] w-[18px]" />{label}{label === "Incidencias" && <span className="ml-auto rounded-full bg-[#fff1dd] px-2 py-0.5 text-[11px] font-bold text-[#a05d05]">2</span>}</button>)}
          </nav>
          <div className="mt-auto rounded-2xl border border-[#d9e7e3] bg-[#f4faf8] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-[#08766f]" />Cumplimiento</div>
            <div className="text-xs leading-5 text-[#667c78]">Archivo cronológico actualizado al 30 de septiembre.</div>
            <Progress value={88} className="mt-3 h-1.5 bg-[#d8e7e3]" />
            <button className="mt-3 text-xs font-semibold text-[#08766f]">Ver preparación GaIA</button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="mb-1 text-xs font-bold uppercase tracking-[.12em] text-[#7a918d]">Jueves, 1 de octubre</p><h1 className="text-2xl font-bold tracking-tight text-[#123d3a] sm:text-[30px]">Control de residuos</h1><p className="mt-1 text-sm text-[#718581]">Visión operativa del hospital y su trazabilidad ambiental.</p></div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button className="h-11 rounded-xl bg-[#08766f] px-5 text-white shadow-sm hover:bg-[#075e59]"><Plus className="mr-2 h-4 w-4" />Registrar residuo</Button></DialogTrigger>
              <DialogContent className="max-w-xl rounded-2xl border-0 p-0 overflow-hidden">
                <div className="bg-[#073c3b] px-6 py-5 text-white"><DialogHeader><DialogTitle className="text-xl">Nuevo contenedor</DialogTitle><DialogDescription className="text-emerald-50/70">Identifica el residuo en el punto de generación.</DialogDescription></DialogHeader></div>
                <form onSubmit={addRecord} className="grid gap-5 p-6 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2"><Label htmlFor="containerCode">Código del contenedor</Label><Input id="containerCode" name="containerCode" required placeholder="BIO-2410-0192" className="h-11" /></div>
                  <div className="space-y-2 sm:col-span-2"><Label>Tipo de residuo</Label><Select name="wasteType" required><SelectTrigger className="h-11 w-full"><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger><SelectContent><SelectItem value="Biosanitario especial">Biosanitario especial</SelectItem><SelectItem value="Cortantes y punzantes">Cortantes y punzantes</SelectItem><SelectItem value="Citotóxico">Citotóxico</SelectItem><SelectItem value="Reactivos químicos">Reactivos químicos</SelectItem><SelectItem value="Medicamentos">Medicamentos</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="lerCode">Código LER</Label><Input id="lerCode" name="lerCode" required placeholder="18 01 03*" className="h-11" /></div>
                  <div className="space-y-2"><Label>Unidad de origen</Label><Select name="unit" required><SelectTrigger className="h-11 w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger><SelectContent>{["Urgencias","UCI","Quirófano","Oncología","Laboratorio","Farmacia"].map((unit) => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}</SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="weightKg">Peso (kg)</Label><Input id="weightKg" name="weightKg" required min="0.1" step="0.1" type="number" placeholder="4,5" className="h-11" /></div>
                  <div className="space-y-2"><Label>Riesgo</Label><Select name="risk" defaultValue="biológico"><SelectTrigger className="h-11 w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="biológico">Biológico</SelectItem><SelectItem value="citotóxico">Citotóxico</SelectItem><SelectItem value="químico">Químico</SelectItem><SelectItem value="ordinario">Ordinario</SelectItem></SelectContent></Select></div>
                  <div className="flex justify-end gap-3 border-t pt-5 sm:col-span-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button><Button className="bg-[#08766f] hover:bg-[#075e59]">Añadir a la demo</Button></div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {!hasLocalData && <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#cfe0dc] bg-white px-4 py-3 text-sm text-[#586f6b]"><span className="rounded-md bg-[#e9f5f2] px-2 py-1 text-[11px] font-bold uppercase text-[#08766f]">Template</span>Los datos son de demostración y los cambios se guardan solo durante esta sesión.</div>}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric title="Generado este mes" value="4.286 kg" note="8,4% menos que septiembre" icon={Boxes} tone="teal" />
            <Metric title="Pendiente de retirada" value="18 cont." note="Próxima retirada: 16:30" icon={Truck} tone="amber" />
            <Metric title="Trazabilidad completa" value="98,6%" note="Objetivo mensual: 99%" icon={CheckCircle2} tone="green" />
            <Metric title="Incidencias abiertas" value="2" note="1 requiere revisión hoy" icon={AlertTriangle} tone="red" />
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.75fr]">
            <div className="rounded-2xl border border-[#dce5e2] bg-white p-5 shadow-[0_8px_28px_rgba(12,65,61,.04)] sm:p-6">
              <div className="flex items-start justify-between"><div><h2 className="font-bold text-[#183d3a]">Evolución mensual</h2><p className="mt-1 text-xs text-[#7b8e8b]">Kilogramos registrados por semana</p></div><div className="rounded-lg bg-[#f2f6f5] p-2"><BarChart3 className="h-4 w-4 text-[#08766f]" /></div></div>
              <div className="mt-7 grid h-48 grid-cols-6 items-end gap-3 border-b border-[#dfe7e5] px-2 sm:gap-5">
                {[54,72,49,84,67,91].map((value, index) => <div key={index} className="group flex h-full flex-col justify-end"><div className="relative rounded-t-lg bg-[#0c7770] transition hover:bg-[#0a625d]" style={{ height: `${value}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 text-[10px] font-bold text-[#47635f] group-hover:block">{value * 12}</span></div></div>)}
              </div><div className="mt-3 grid grid-cols-6 text-center text-[11px] text-[#849692]">{["S35","S36","S37","S38","S39","S40"].map((week) => <span key={week}>{week}</span>)}</div>
            </div>
            <div className="rounded-2xl border border-[#dce5e2] bg-white p-5 shadow-[0_8px_28px_rgba(12,65,61,.04)] sm:p-6">
              <h2 className="font-bold text-[#183d3a]">Distribución</h2><p className="mt-1 text-xs text-[#7b8e8b]">Por tipo de residuo</p>
              <div className="mt-6 flex h-4 overflow-hidden rounded-full">{wasteMix.map((item) => <div key={item.label} className={item.color} style={{ width: `${item.value}%` }} />)}</div>
              <div className="mt-6 space-y-3.5">{wasteMix.map((item) => <div key={item.label} className="flex items-center text-sm"><span className={`mr-3 h-2.5 w-2.5 rounded-full ${item.color}`} /><span className="text-[#5e7470]">{item.label}</span><span className="ml-auto font-bold text-[#294b47]">{item.value}%</span></div>)}</div>
            </div>
          </section>

          <section className="mt-5 overflow-hidden rounded-2xl border border-[#dce5e2] bg-white shadow-[0_8px_28px_rgba(12,65,61,.04)]">
            <div className="flex flex-col gap-4 border-b border-[#e4eae8] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div><h2 className="font-bold text-[#183d3a]">Trazabilidad reciente</h2><p className="mt-1 text-xs text-[#7b8e8b]">Últimos contenedores identificados</p></div>
              <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#82938f]" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar código o unidad" className="h-10 w-full pl-9 sm:w-64" /></div>
            </div>
            <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#f7f9f8] text-[11px] uppercase tracking-wider text-[#7d908c]"><tr><th className="px-6 py-3 font-bold">Contenedor</th><th className="px-4 py-3 font-bold">Residuo</th><th className="px-4 py-3 font-bold">Origen</th><th className="px-4 py-3 font-bold">Peso</th><th className="px-4 py-3 font-bold">Estado</th><th className="px-6 py-3" /></tr></thead><tbody className="divide-y divide-[#edf1f0]">{filtered.map((record) => <tr key={record.id} className="hover:bg-[#fafcfb]"><td className="px-6 py-4"><div className="font-semibold text-[#204440]">{record.containerCode}</div><div className="mt-0.5 font-mono text-[11px] text-[#8a9a97]">LER {record.lerCode}</div></td><td className="px-4 py-4 text-[#4f6965]">{record.wasteType}</td><td className="px-4 py-4 text-[#4f6965]">{record.unit}</td><td className="px-4 py-4 font-semibold text-[#355652]">{formatKg(record.weightKg)}</td><td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusStyle[record.status] ?? statusStyle.registrado}`}>{record.status}</span></td><td className="px-6 py-4"><button aria-label={`Ver ${record.containerCode}`} className="rounded-lg p-2 text-[#7d908c] hover:bg-[#edf5f3] hover:text-[#08766f]"><ChevronRight className="h-4 w-4" /></button></td></tr>)}</tbody></table></div>
            <div className="flex items-center justify-between border-t border-[#e4eae8] px-6 py-4 text-xs text-[#758985]"><span>{filtered.length} registros visibles</span><button className="font-semibold text-[#08766f]">Ver trazabilidad completa</button></div>
          </section>

          <section className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#eadfcf] bg-[#fffaf3] p-5 sm:p-6"><div className="flex items-start gap-4"><div className="rounded-xl bg-[#fff0d5] p-3 text-[#b46c12]"><AlertTriangle className="h-5 w-5" /></div><div className="min-w-0"><div className="flex items-center gap-2"><h3 className="font-bold text-[#5c421e]">Revisión pendiente</h3><span className="rounded-full bg-[#f2ad43] px-2 py-0.5 text-[10px] font-bold text-white">HOY</span></div><p className="mt-2 text-sm leading-6 text-[#785f3c]">Un contenedor de Laboratorio permanece en almacenamiento final desde hace 64 horas.</p><button className="mt-4 flex items-center gap-1 text-sm font-bold text-[#9a5a08]">Abrir incidencia <ArrowUpRight className="h-4 w-4" /></button></div></div></div>
            <div className="rounded-2xl border border-[#d6e5e1] bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="rounded-xl bg-[#e5f4f0] p-3 text-[#08766f]"><ClipboardList className="h-5 w-5" /></div><div><h3 className="font-bold text-[#244641]">Cierre mensual</h3><p className="mt-1 text-xs text-[#7b8e8b]">Preparación del archivo cronológico</p></div></div><span className="text-sm font-bold text-[#08766f]">88%</span></div><Progress value={88} className="mt-5 h-2" /><div className="mt-4 flex items-center justify-between text-xs text-[#6e827e]"><span>3 comprobaciones pendientes</span><button className="font-bold text-[#08766f]">Continuar</button></div></div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Metric({ title, value, note, icon: Icon, tone }: { title: string; value: string; note: string; icon: typeof Boxes; tone: string }) {
  const tones: Record<string, string> = { teal: "bg-[#e4f3ef] text-[#08766f]", amber: "bg-[#fff0d5] text-[#b26b10]", green: "bg-[#e8f5eb] text-[#3b7d50]", red: "bg-[#fee9e7] text-[#bd5149]" };
  return <div className="rounded-2xl border border-[#dce5e2] bg-white p-5 shadow-[0_8px_28px_rgba(12,65,61,.04)]"><div className="flex items-start justify-between"><div className={`rounded-xl p-2.5 ${tones[tone]}`}><Icon className="h-5 w-5" /></div><button className="rounded-lg p-1.5 text-[#94a39f] hover:bg-[#f2f6f5]" aria-label={`Detalles de ${title}`}><ArrowUpRight className="h-4 w-4" /></button></div><div className="mt-4 text-sm text-[#6b807c]">{title}</div><div className="mt-1 text-[26px] font-bold tracking-tight text-[#183d3a]">{value}</div><div className="mt-2 text-xs text-[#859692]">{note}</div></div>;
}
