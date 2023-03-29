export const getTodayDateISO = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};
