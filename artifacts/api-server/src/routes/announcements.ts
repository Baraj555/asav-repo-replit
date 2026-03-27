import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { announcementsTable } from "@workspace/db/schema";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const announcements = await db.select().from(announcementsTable).orderBy(announcementsTable.createdAt);
  res.json(announcements.reverse());
});

router.post("/", async (req, res) => {
  const { title, content, type, targetRole } = req.body;

  const [announcement] = await db.insert(announcementsTable).values({
    title,
    content,
    type: type || "info",
    targetRole: targetRole || "all",
    createdBy: "Admin",
  }).returning();

  res.status(201).json(announcement);
});

export default router;
