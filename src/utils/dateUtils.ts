
export const getDaysDifference = (startDate: Date, endDate: Date): number => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceInMilliseconds / oneDayInMilliseconds);
  };
