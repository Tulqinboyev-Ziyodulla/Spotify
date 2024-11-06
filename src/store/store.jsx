import { configureStore } from "@reduxjs/toolkit";
import { LikeSlice } from "./likeSlice";

export const store = configureStore({
    reducer:LikeSlice.reducer
})