
import { ApiRoutes } from '@/constant/constant';
import { getCookie } from 'cookies-next';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import { headers } from 'next/headers';

export const fetchTasks = createAsyncThunk(`tasks/fetchTask` , async ()=> {
    const token = getCookie(`token`)
    const response = await axios.get(ApiRoutes.getTask , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log("TASK API CALLED=>", response.data)
    return response.data;
})

export const addTasks = createAsyncThunk(`tasks/addTask` , async (taskData)=> {
    const token = getCookie(`token`)
    const response = await axios.post(ApiRoutes.postTask , taskData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log("TASK API CALLED=>", response.data)
    return response.data;
})
                                                                        

 const initialState = {
    task: [],
    isLoading: true,
    status: "pending",
    error: null,
 }

 export const taskSlice = createSlice({
    name: `task`,
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.status = 'pending'
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.task = action.payload
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message ?? 'Unknown Error'
        })
        .addCase(addTasks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.task.data.push(action.payload); // Add the new task to the list
        })
    }
 })

export const { } = taskSlice.actions

 export default taskSlice.reducer