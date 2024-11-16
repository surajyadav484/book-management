import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./redux/slices/book";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});
