import { AxiosError } from "axios";

export const errorAPIHandler = (error: unknown) => {
  if (error instanceof AxiosError && error.response?.data?.message) {
    return Array.isArray(error.response.data.message)
      ? error.response.data.message
      : [error.response.data.message];
  }

  if (error instanceof Error) {
    return error;
  }
};
