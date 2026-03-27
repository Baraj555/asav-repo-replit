import { pgTable, serial, integer, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const placementStatusEnum = pgEnum("placement_status", ["in_progress", "placed", "rejected", "offer_received"]);

export const placementsTable = pgTable("placements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  studentName: text("student_name").notNull(),
  companyName: text("company_name").notNull(),
  role: text("role").notNull(),
  package: text("package"),
  status: placementStatusEnum("status").notNull().default("in_progress"),
  interviewDate: timestamp("interview_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPlacementSchema = createInsertSchema(placementsTable).omit({ id: true, createdAt: true });
export type InsertPlacement = z.infer<typeof insertPlacementSchema>;
export type Placement = typeof placementsTable.$inferSelect;
