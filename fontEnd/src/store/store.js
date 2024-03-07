import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./usersSlice.js";



export default configureStore({

    reducer: {
        users: usersSlice.reducer,
    },
});