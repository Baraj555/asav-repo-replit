import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const router: IRouter = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "asav_salt_2024").digest("hex");
}

function generateToken(userId: number, role: string): string {
  const payload = Buffer.from(JSON.stringify({ userId, role, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64");
  return `asav_${payload}`;
}

export function parseToken(token: string): { userId: number; role: string } | null {
  try {
    if (!token.startsWith("asav_")) return null;
    const payload = JSON.parse(Buffer.from(token.slice(5), "base64").toString());
    if (payload.exp < Date.now()) return null;
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "bad_request", message: "Email and password required" });
    return;
  }

  const users = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  const user = users[0];

  if (!user || user.passwordHash !== hashPassword(password)) {
    res.status(401).json({ error: "unauthorized", message: "Invalid credentials" });
    return;
  }

  const token = generateToken(user.id, user.role);
  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar, createdAt: user.createdAt },
    token,
  });
});

router.post("/register", async (req, res) => {
  const { name, email, password, role = "student", phone } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "bad_request", message: "Name, email and password required" });
    return;
  }

  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
    res.status(400).json({ error: "conflict", message: "Email already registered" });
    return;
  }

  const [user] = await db.insert(usersTable).values({
    name,
    email,
    passwordHash: hashPassword(password),
    role: role as "student" | "trainer" | "admin",
    phone,
  }).returning();

  const token = generateToken(user.id, user.role);
  res.status(201).json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar, createdAt: user.createdAt },
    token,
  });
});

router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "unauthorized", message: "Token required" });
    return;
  }

  const parsed = parseToken(authHeader.slice(7));
  if (!parsed) {
    res.status(401).json({ error: "unauthorized", message: "Invalid token" });
    return;
  }

  const users = await db.select().from(usersTable).where(eq(usersTable.id, parsed.userId)).limit(1);
  const user = users[0];
  if (!user) {
    res.status(404).json({ error: "not_found", message: "User not found" });
    return;
  }

  res.json({ id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar, createdAt: user.createdAt });
});

router.post("/logout", (_req, res) => {
  res.json({ message: "Logged out successfully" });
});

export default router;
