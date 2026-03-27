import { pgTable, serial, text, timestamp, boolean, integer, real, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const levelEnum = pgEnum("level", ["beginner", "intermediate", "advanced"]);
export const courseStatusEnum = pgEnum("course_status", ["active", "draft", "archived"]);

export const coursesTable = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  level: levelEnum("level").notNull(),
  category: text("category").notNull(),
  trainerName: text("trainer_name").notNull(),
  trainerBio: text("trainer_bio"),
  realTimeProjects: integer("real_time_projects").default(0),
  hasCertification: boolean("has_certification").notNull().default(true),
  price: real("price").default(0),
  thumbnail: text("thumbnail"),
  topics: text("topics").array(),
  prerequisites: text("prerequisites").array(),
  enrolledCount: integer("enrolled_count").default(0),
  rating: real("rating").default(4.5),
  status: courseStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCourseSchema = createInsertSchema(coursesTable).omit({ id: true, createdAt: true });
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof coursesTable.$inferSelect;
