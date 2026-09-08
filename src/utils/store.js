import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import connectionRequestsReducer from "./connectionRequestsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        connectionRequests: connectionRequestsReducer
    }
})

export default store;