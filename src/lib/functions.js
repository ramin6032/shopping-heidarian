import moment from "jalali-moment";

export const addComma = (num) => {
  let objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");
  if (num) {
    let str = num.toString();
    while (objRegex.test(str)) {
      str = str.replace(objRegex, "$1,$2");
    }

    return str;
  } else {
    return "";
  }
};

export const timestampToJalali = (time) => {
  if (time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const m = moment(`${year}-${month}-${day}`, "YYYY/MM/DD");
    m.locale("fa");
    return m.format("YYYY/MM/DD");
  }
  return "";
};
