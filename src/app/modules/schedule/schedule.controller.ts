import { Request, Response } from "express";
import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

const scheduleForDoctors = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillter = pick(req.query, ["startDateTime", "endDateTime"]);

    const user = req.user;

    const result = await ScheduleService.scheduleForDoctors(user, fillter, options);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Schedule fetched successfully!",
      data: result,
    });
  }
);

export const ScheduleController = { insertIntoDB, scheduleForDoctors };
