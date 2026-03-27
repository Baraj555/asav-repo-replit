import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import coursesRouter from "./courses";
import enrollmentsRouter from "./enrollments";
import studentsRouter from "./students";
import trainersRouter from "./trainers";
import certificatesRouter from "./certificates";
import placementsRouter from "./placements";
import announcementsRouter from "./announcements";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/courses", coursesRouter);
router.use("/enrollments", enrollmentsRouter);
router.use("/students", studentsRouter);
router.use("/trainers", trainersRouter);
router.use("/certificates", certificatesRouter);
router.use("/placements", placementsRouter);
router.use("/announcements", announcementsRouter);
router.use("/admin", adminRouter);

export default router;
