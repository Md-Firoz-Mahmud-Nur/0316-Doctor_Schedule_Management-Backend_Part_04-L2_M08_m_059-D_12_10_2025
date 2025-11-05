import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { ScheduleController } from "./schedule.controller";

const router = express.Router();

router.get("/", auth(UserRole.DOCTOR), ScheduleController.scheduleForDoctors);

router.post("/", ScheduleController.insertIntoDB);

router.delete("/:id", ScheduleController.deleteScheduleFromDB);

export const scheduleRoutes = router;
