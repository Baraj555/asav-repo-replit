import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { certificatesTable, enrollmentsTable, coursesTable, usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { parseToken } from "./auth";
import crypto from "crypto";

const router: IRouter = Router();

function getUserFromReq(req: any): { userId: number; role: string } | null {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;
  return parseToken(authHeader.slice(7));
}

router.get("/", async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) { res.status(401).json({ error: "unauthorized" }); return; }

  const certs = await db.select().from(certificatesTable).where(eq(certificatesTable.userId, user.userId));
  res.json(certs);
});

router.post("/generate", async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) { res.status(401).json({ error: "unauthorized" }); return; }

  const { enrollmentId } = req.body;

  const enrollments = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.id, enrollmentId)).limit(1);
  const enrollment = enrollments[0];
  if (!enrollment || enrollment.userId !== user.userId) {
    res.status(404).json({ error: "not_found", message: "Enrollment not found" });
    return;
  }

  const courses = await db.select().from(coursesTable).where(eq(coursesTable.id, enrollment.courseId)).limit(1);
  const users = await db.select().from(usersTable).where(eq(usersTable.id, user.userId)).limit(1);

  const certNumber = `ASAV-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

  const [cert] = await db.insert(certificatesTable).values({
    userId: user.userId,
    courseId: enrollment.courseId,
    courseName: courses[0]?.title || "Course",
    studentName: users[0]?.name || "Student",
    certificateNumber: certNumber,
    downloadUrl: `/api/certificates/${certNumber}/download`,
  }).returning();

  res.status(201).json(cert);
});

export default router;
