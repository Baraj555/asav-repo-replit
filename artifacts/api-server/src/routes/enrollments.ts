import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { enrollmentsTable, coursesTable, usersTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { parseToken } from "./auth";

const router: IRouter = Router();

function getUserFromReq(req: any): { userId: number; role: string } | null {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;
  return parseToken(authHeader.slice(7));
}

router.get("/", async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) { res.status(401).json({ error: "unauthorized" }); return; }

  const enrollments = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.userId, user.userId));

  const result = [];
  for (const e of enrollments) {
    const courses = await db.select().from(coursesTable).where(eq(coursesTable.id, e.courseId)).limit(1);
    const course = courses[0];
    result.push({
      ...e,
      course: course ? { ...course, topics: course.topics || [], prerequisites: course.prerequisites || [] } : null,
    });
  }
  res.json(result);
});

router.post("/", async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) { res.status(401).json({ error: "unauthorized" }); return; }

  const { courseId } = req.body;

  const existing = await db.select().from(enrollmentsTable)
    .where(and(eq(enrollmentsTable.userId, user.userId), eq(enrollmentsTable.courseId, courseId))).limit(1);

  if (existing.length > 0) {
    res.status(400).json({ error: "already_enrolled", message: "Already enrolled in this course" });
    return;
  }

  const [enrollment] = await db.insert(enrollmentsTable).values({
    userId: user.userId,
    courseId,
    progress: 0,
    status: "active",
  }).returning();

  await db.update(coursesTable).set({ enrolledCount: (await db.select().from(coursesTable).where(eq(coursesTable.id, courseId)).limit(1))[0]?.enrolledCount ?? 0 + 1 }).where(eq(coursesTable.id, courseId));

  const courses = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId)).limit(1);
  res.status(201).json({ ...enrollment, course: courses[0] ? { ...courses[0], topics: courses[0].topics || [], prerequisites: courses[0].prerequisites || [] } : null });
});

router.put("/:id/progress", async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) { res.status(401).json({ error: "unauthorized" }); return; }

  const id = parseInt(req.params.id);
  const { progress, status } = req.body;

  const updateData: any = { progress, lastAccessedAt: new Date() };
  if (status) updateData.status = status;
  if (progress === 100) updateData.completedAt = new Date();

  const [updated] = await db.update(enrollmentsTable).set(updateData).where(eq(enrollmentsTable.id, id)).returning();
  res.json({ ...updated, course: null });
});

export default router;
