import { configureStore } from "@reduxjs/toolkit";
import cookieReducer from "../reducers/cookieReducer";

export default configureStore({
  reducer: {
    auth: cookieReducer,
  },
});
