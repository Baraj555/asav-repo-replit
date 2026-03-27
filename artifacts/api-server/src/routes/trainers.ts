import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const trainers = await db.select().from(usersTable).where(eq(usersTable.role, "trainer"));

  res.json(trainers.map(t => ({
    id: t.id,
    name: t.name,
    email: t.email,
    expertise: [],
    bio: "Experienced IT professional",
    experience: "5+ years",
    coursesCount: 2,
    studentsCount: 50,
    rating: 4.8,
    avatar: t.avatar,
  })));
});

export default router;
