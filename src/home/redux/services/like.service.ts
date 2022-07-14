import { AxiosResponse } from "axios";
import { getBaseAPIUrl } from "../../../config";
import axiosInstance from "../../../services/api";
import { LikeCountData, LikeData } from "../slices/like.slice";

export type Like = {
  id?: number;
  source_type: string;
  username?: string;
  user_id?: number;
};

const getBaseUrl = () => `${getBaseAPIUrl()}/like-counter`;

export const incrementLikeAPI = async (
  data: LikeData
): Promise<AxiosResponse> => {
  return axiosInstance.post<Like>(getBaseUrl(), data);
};

export const getLikesAPI = async ({
  source,
}: LikeData): Promise<AxiosResponse<LikeCountData>> => {
  return axiosInstance.get<LikeCountData>(getBaseUrl(), { params: { source } });
};
