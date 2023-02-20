import { configureStore } from '@reduxjs/toolkit';
import tableSlice from "./slices/tableSlice";

export default configureStore({
    reducer: {
        table: tableSlice,
    },
    devTools: true,
})