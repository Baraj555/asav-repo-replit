import { pgTable, serial, integer, real, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { coursesTable } from "./courses";

export const enrollmentStatusEnum = pgEnum("enrollment_status", ["active", "completed", "paused"]);

export const enrollmentsTable = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  courseId: integer("course_id").notNull().references(() => coursesTable.id),
  progress: real("progress").notNull().default(0),
  status: enrollmentStatusEnum("status").notNull().default("active"),
  enrolledAt: timestamp("enrolled_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  lastAccessedAt: timestamp("last_accessed_at"),
});

export const insertEnrollmentSchema = createInsertSchema(enrollmentsTable).omit({ id: true, enrolledAt: true });
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollmentsTable.$inferSelect;
