import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { placementsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
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

  const placements = user.role === "admin" || user.role === "trainer"
    ? await db.select().from(placementsTable)
    : await db.select().from(placementsTable).where(eq(placementsTable.userId, user.userId));

  res.json(placements);
});

router.post("/", async (req, res) => {
  const user = getUserFromReq(req);
  if (!user) { res.status(401).json({ error: "unauthorized" }); return; }

  const { userId, companyName, role, package: pkg, status, interviewDate, notes, studentName } = req.body;

  const [placement] = await db.insert(placementsTable).values({
    userId: userId || user.userId,
    studentName: studentName || "Student",
    companyName,
    role,
    package: pkg,
    status: status || "in_progress",
    interviewDate: interviewDate ? new Date(interviewDate) : undefined,
    notes,
  }).returning();

  res.status(201).json(placement);
});

export default router;
