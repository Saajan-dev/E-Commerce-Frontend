import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./reducers/userDetails";

export default configureStore({
  reducer: {
    loginuserData: userDetails,
  },
});
