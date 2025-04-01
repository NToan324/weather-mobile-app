import dateFormat from "dateformat";
export const formatDate = (dateTime: string) => {
  return dateTime?.split(" ")[1];
};

export const formatDay = (dateTime: string) => {
  return dateFormat(dateTime, "dddd");
};
