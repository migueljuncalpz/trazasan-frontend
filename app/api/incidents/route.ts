import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { incidents } from "../../../db/schema";

export async function GET() {
  try {
    const rows = await getDb().select().from(incidents).orderBy(desc(incidents.createdAt)).limit(50);
    return Response.json({ incidents: rows });
  } catch (error) {
    console.error("incidents_get_failed", error);
    return Response.json({ error: "No se pudieron cargar las incidencias." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const title = String(payload.title ?? "").trim();
    const location = String(payload.location ?? "").trim();
    const severity = String(payload.severity ?? "media").trim();
    if (!title || !location) return Response.json({ error: "Completa la incidencia." }, { status: 400 });
    const [incident] = await getDb().insert(incidents).values({ title, location, severity, status: "abierta", createdAt: new Date() }).returning();
    return Response.json({ incident }, { status: 201 });
  } catch (error) {
    console.error("incidents_post_failed", error);
    return Response.json({ error: "No se pudo registrar la incidencia." }, { status: 500 });
  }
}
