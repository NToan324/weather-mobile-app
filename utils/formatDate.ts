import dateFormat from "dateformat";
export const formatDate = (dateTime: string) => {
  return dateTime?.split(" ")[1];
};

export const formatDay = (dateTime: string) => {
  return dateFormat(dateTime, "dddd");
};

export const formatFullDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return dateFormat(date, "mmmm d, yyyy");
};
