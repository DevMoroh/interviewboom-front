import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchError } from "../../../interfaces/types";
import { errorAPIHandler } from "../../../utils/handleErrors";
import { getLikesAPI, incrementLikeAPI, Like } from "../services/like.service";

export type LikeData = {
  source: string;
  username?: string;
};

export type LikeCountData = { count: number; likes: Like[] };

export const incrementLike = createAsyncThunk<
  Like | void,
  LikeData,
  { rejectValue: FetchError }
>("get", async (dataLike, { rejectWithValue }) => {
  try {
    const { data } = await incrementLikeAPI(dataLike);
    return data;
  } catch (error) {
    return rejectWithValue(errorAPIHandler(error));
  }
});

export const getLikes = createAsyncThunk<
  LikeCountData,
  LikeData,
  { rejectValue: FetchError }
>("get", async (dataQuery, { rejectWithValue }) => {
  try {
    const { data } = await getLikesAPI(dataQuery);
    return data;
  } catch (error) {
    return rejectWithValue(errorAPIHandler(error));
  }
});

const initialState: {
  isError: boolean;
  errorMessages: string[];
  loading: boolean;
} = {
  isError: false,
  errorMessages: [],
  loading: false,
};

const likeSlice = createSlice({
  name: "likesCRUD",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
      (state, action) => {
        state.loading = false;
        if (
          action.type.endsWith("/rejected") &&
          Array.isArray(action.payload)
        ) {
          state.errorMessages = action.payload;
        }
      }
    );
  },
});

const { reducer } = likeSlice;
export { reducer as likeReducer };
