import moment from "moment";
const status = {
  SUCCESS: 200,
};

const getToken = (): string => {
  const token = localStorage.getItem("token");

  if (!token) return "";
  return token;
};
const getRole = () => {
  return localStorage.getItem("role");
};
const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

const setRole = (role: string): void => {
  localStorage.setItem("role", role);
};

const getFormJSON = (form: any) => {
  const data = new FormData(form);
  return Array.from(data.keys()).reduce((result: any, key) => {
    if (result[key]) {
      result[key] = data.getAll(key);
      return result;
    }
    result[key] = data.get(key);
    return result;
  }, {});
};

const weekday: String[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timeStampToDate = (timeStamp: string) => {
  return moment(timeStamp).format("YYYY-MM-DD");
};

const getName = () => {
  return localStorage.getItem("name");
};
const setName = (name: string): void => {
  localStorage.setItem("name", name);
};

const isSuccess = (response: any) => {
  return response?.statusCode === status.SUCCESS;
};

export {
  getToken,
  setToken,
  getFormJSON,
  timeStampToDate,
  weekday,
  getRole,
  setRole,
  getName,
  setName,
  isSuccess,
};
