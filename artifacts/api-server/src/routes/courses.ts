import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { coursesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  const { category, level } = req.query;
  let query = db.select().from(coursesTable);
  const results = await query;

  let filtered = results;
  if (category) filtered = filtered.filter(c => c.category === category);
  if (level) filtered = filtered.filter(c => c.level === level);

  res.json(filtered.map(c => ({
    ...c,
    topics: c.topics || [],
    prerequisites: c.prerequisites || [],
  })));
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const courses = await db.select().from(coursesTable).where(eq(coursesTable.id, id)).limit(1);
  if (!courses[0]) {
    res.status(404).json({ error: "not_found", message: "Course not found" });
    return;
  }
  const c = courses[0];
  res.json({ ...c, topics: c.topics || [], prerequisites: c.prerequisites || [] });
});

router.post("/", async (req, res) => {
  const { title, description, duration, level, category, trainerName, trainerBio, realTimeProjects, hasCertification, price, topics, prerequisites } = req.body;

  const [course] = await db.insert(coursesTable).values({
    title,
    description,
    duration,
    level,
    category,
    trainerName,
    trainerBio,
    realTimeProjects: realTimeProjects || 0,
    hasCertification: hasCertification ?? true,
    price: price || 0,
    topics: topics || [],
    prerequisites: prerequisites || [],
    status: "active",
  }).returning();

  res.status(201).json({ ...course, topics: course.topics || [], prerequisites: course.prerequisites || [] });
});

export default router;
