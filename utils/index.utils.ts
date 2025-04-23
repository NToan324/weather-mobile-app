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

export function extractCodeFromNightIcon(iconUrl: string) {
  const parts = iconUrl.split("/");
  const filename = parts[parts.length - 1];
  const codePart = filename.split(".")[0];
  if (!isNaN(parseInt(codePart, 10))) {
    return codePart;
  }
  return null;
}

export const imageWeather: Record<string, any> = {
  "113": require("@/assets/images/113.png"),
  "116": require("@/assets/images/116.png"),
  "119": require("@/assets/images/119.png"),
  "122": require("@/assets/images/122.png"),
  "143": require("@/assets/images/143.png"),
  "176": require("@/assets/images/176.png"),
  "179": require("@/assets/images/179.png"),
  "182": require("@/assets/images/182.png"),
  "185": require("@/assets/images/185.png"),
  "200": require("@/assets/images/200.png"),
  "227": require("@/assets/images/227.png"),
  "230": require("@/assets/images/230.png"),
  "248": require("@/assets/images/248.png"),
  "260": require("@/assets/images/260.png"),
  "263": require("@/assets/images/263.png"),
  "266": require("@/assets/images/266.png"),
  "281": require("@/assets/images/281.png"),
  "284": require("@/assets/images/284.png"),
  "293": require("@/assets/images/293.png"),
  "296": require("@/assets/images/296.png"),
  "299": require("@/assets/images/299.png"),
  "302": require("@/assets/images/302.png"),
  "305": require("@/assets/images/305.png"),
  "308": require("@/assets/images/308.png"),
  "311": require("@/assets/images/311.png"),
  "314": require("@/assets/images/314.png"),
  "317": require("@/assets/images/317.png"),
  "320": require("@/assets/images/320.png"),
  "323": require("@/assets/images/323.png"),
  "326": require("@/assets/images/326.png"),
  "329": require("@/assets/images/329.png"),
  "353": require("@/assets/images/353.png"),
  "356": require("@/assets/images/356.png"),
  "359": require("@/assets/images/359.png"),
  "386": require("@/assets/images/386.png"),
  "389": require("@/assets/images/389.png"),
  "392": require("@/assets/images/392.png"),
  "395": require("@/assets/images/395.png"),
};
