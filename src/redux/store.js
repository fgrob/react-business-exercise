import { configureStore } from "@reduxjs/toolkit";
import salesSlice from "./salesSlice";

const store = configureStore({
    reducer: {
        sales: salesSlice,
    },
});

export default store;

