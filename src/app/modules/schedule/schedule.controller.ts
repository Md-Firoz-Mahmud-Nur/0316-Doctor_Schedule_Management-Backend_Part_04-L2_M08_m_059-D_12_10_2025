import { Request, Response } from "express";
import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";
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
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillter = pick(req.query, ["startDateTime", "endDateTime"]);

    const user = req.user;

    const result = await ScheduleService.scheduleForDoctors(
      user as IJWTPayload,
      fillter,
      options
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule fetched successfully!",
      meta: result.meta,
      data: result.data,
    });
  }
);

const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  console.log(id);

  const result = await ScheduleService.deleteScheduleFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule deleted successfully!",
    data: result,
  });
});

export const ScheduleController = {
  insertIntoDB,
  scheduleForDoctors,
  deleteScheduleFromDB,
};
