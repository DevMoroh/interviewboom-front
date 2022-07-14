export const getBaseAPIUrl = () => {
  return process.env.NODE_ENV === "production"
    ? "https://api.interviewboom.com/api"
    : "http://localhost:3000/api";
};
