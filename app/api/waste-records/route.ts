import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { wasteRecords } from "../../../db/schema";

const allowedStatuses = new Set(["registrado", "almacenado", "retirado", "tratado"]);

export async function GET() {
  try {
    const records = await getDb().select().from(wasteRecords).orderBy(desc(wasteRecords.createdAt)).limit(100);
    return Response.json({ records });
  } catch (error) {
    console.error("waste_records_get_failed", error);
    return Response.json({ error: "No se pudieron cargar los registros." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const containerCode = String(payload.containerCode ?? "").trim();
    const wasteType = String(payload.wasteType ?? "").trim();
    const lerCode = String(payload.lerCode ?? "").trim();
    const unit = String(payload.unit ?? "").trim();
    const risk = String(payload.risk ?? "ordinario").trim();
    const weightKg = Math.round(Number(payload.weightKg) * 1000);
    if (!containerCode || !wasteType || !lerCode || !unit || !Number.isFinite(weightKg) || weightKg <= 0) {
      return Response.json({ error: "Revisa los datos obligatorios." }, { status: 400 });
    }
    const now = new Date();
    const [record] = await getDb().insert(wasteRecords).values({
      containerCode, wasteType, lerCode, unit, risk, weightKg,
      status: "registrado", createdAt: now, updatedAt: now,
    }).returning();
    return Response.json({ record }, { status: 201 });
  } catch (error) {
    console.error("waste_records_post_failed", error);
    return Response.json({ error: "No se pudo guardar el registro." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const payload = (await request.json()) as { id?: number; status?: string };
    const id = Number(payload.id);
    const status = String(payload.status ?? "");
    if (!Number.isInteger(id) || !allowedStatuses.has(status)) {
      return Response.json({ error: "Cambio no válido." }, { status: 400 });
    }
    const [record] = await getDb().update(wasteRecords).set({ status, updatedAt: new Date() }).where(eq(wasteRecords.id, id)).returning();
    if (!record) return Response.json({ error: "Registro no encontrado." }, { status: 404 });
    return Response.json({ record });
  } catch (error) {
    console.error("waste_records_patch_failed", error);
    return Response.json({ error: "No se pudo actualizar el estado." }, { status: 500 });
  }
}
