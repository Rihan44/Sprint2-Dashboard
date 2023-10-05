import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { roomsData } from "../data/roomsData";

const delay = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 600)
    });
}

export const getAllRooms = createAsyncThunk("rooms/getAllRooms", async () => {
   return await delay(roomsData);
});

export const getRoom = createAsyncThunk("rooms/getRoom", async (id) => {
    return await delay(id);
});

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id) => {
    return await delay(id);
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (id) => {
    return await delay(id);
});

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllRooms.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(getAllRooms.pending, (state) => {state.status = "pending"})
        .addCase(getAllRooms.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(getRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = state.data.filter(data => {return data.id === action.payload})
        })
        .addCase(getRoom.pending, (state) => {state.status = "pending"})
        .addCase(getRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = state.data.filter(data => {return data.id !== action.payload})
        })
        .addCase(deleteRoom.pending, (state) => {state.status = "pending"})
        .addCase(deleteRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            /* WIP */
        })
        .addCase(updateRoom.pending, (state) => {state.status = "pending"})
        .addCase(updateRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})