import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, enrollmentsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const students = await db.select().from(usersTable).where(eq(usersTable.role, "student"));

  const result = [];
  for (const s of students) {
    const enrollments = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.userId, s.id));
    const completed = enrollments.filter(e => e.status === "completed").length;
    const overallProgress = enrollments.length > 0
      ? enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length
      : 0;

    result.push({
      id: s.id,
      name: s.name,
      email: s.email,
      phone: s.phone,
      enrolledCourses: enrollments.length,
      completedCourses: completed,
      overallProgress,
      joinedAt: s.createdAt,
      placementStatus: "not_started",
    });
  }

  res.json(result);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
  const student = users[0];
  if (!student) { res.status(404).json({ error: "not_found" }); return; }

  const enrollments = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.userId, id));
  const completed = enrollments.filter(e => e.status === "completed").length;
  const overallProgress = enrollments.length > 0
    ? enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length
    : 0;

  res.json({
    id: student.id,
    name: student.name,
    email: student.email,
    phone: student.phone,
    enrolledCourses: enrollments.length,
    completedCourses: completed,
    overallProgress,
    joinedAt: student.createdAt,
    placementStatus: "not_started",
  });
});

export default router;
