import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const wasteRecords = sqliteTable("waste_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  containerCode: text("container_code").notNull(),
  wasteType: text("waste_type").notNull(),
  lerCode: text("ler_code").notNull(),
  unit: text("unit").notNull(),
  weightKg: integer("weight_kg").notNull(),
  status: text("status").notNull().default("registrado"),
  risk: text("risk").notNull().default("ordinario"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [
  index("idx_waste_records_status_created").on(table.status, table.createdAt),
  index("idx_waste_records_unit").on(table.unit),
]);

export const incidents = sqliteTable("incidents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  location: text("location").notNull(),
  severity: text("severity").notNull().default("media"),
  status: text("status").notNull().default("abierta"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [index("idx_incidents_status_created").on(table.status, table.createdAt)]);
