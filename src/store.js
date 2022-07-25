import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './slices/themeSlice';
import listSlice from "./slices/listSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        tasks: listSlice,
    }
})

export default store;