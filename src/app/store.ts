import {configureStore} from "@reduxjs/toolkit";

import {bookingsSlice} from "../features/slices/bookings/bookingsSlice";
import { roomsSlice } from "../features/slices/rooms/roomsSlice";
import { contactSlice } from "../features/slices/contacts/contactSlice";
import { usersSlice } from "../features/slices/users/usersSlice";
import { loginSlice } from "../features/slices/login/loginSlice";

export const Store = configureStore({
    reducer: {
        bookings: bookingsSlice.reducer,
        contact: contactSlice.reducer,
        rooms: roomsSlice.reducer,
        users: usersSlice.reducer,
        login: loginSlice.reducer
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch