import express from "express";
import { DoctorScheduleController } from "./DoctorSchedule.controller";

const router = express.Router();

router.post("/", DoctorScheduleController.insertIntoDB);

export const doctorScheduleRoutes = router;
