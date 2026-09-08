import { createSlice } from "@reduxjs/toolkit";

const connectionRequestsSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addConnectionRequests: (state, action) => action.payload,
        removeConnectionRequests: (state, action) => {
            return state.filter((user) => user._id !== action.payload);
        }
    }
})

export const { addConnectionRequests, removeConnectionRequests } = connectionRequestsSlice.actions;
export default connectionRequestsSlice.reducer;