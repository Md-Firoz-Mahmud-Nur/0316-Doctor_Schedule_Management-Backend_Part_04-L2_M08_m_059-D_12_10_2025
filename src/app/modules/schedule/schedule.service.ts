import { addHours, addMinutes, format } from "date-fns";

const insertIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;
  console.log(startDate, endDate, startTime, endTime);

  const intervalTime = 30;

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  console.log(currentDate, lastDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );

    console.log(startDateTime);

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(lastDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    console.log(endDateTime);
  }

  return payload;
};

export const ScheduleService = { insertIntoDB };
