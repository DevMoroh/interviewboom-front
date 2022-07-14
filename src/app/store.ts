import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { likeReducer } from "../home/redux/slices/like.slice";
import { testFlowReducer } from "../test-flow/redux/slices/test-flow.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    likes: likeReducer,
    testFlow: testFlowReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
