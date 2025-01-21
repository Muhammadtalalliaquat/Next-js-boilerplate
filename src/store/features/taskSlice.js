import { ApiRoutes } from "@/constant/constant";
import { getCookie } from "cookies-next";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { headers } from 'next/headers';

export const fetchTasks = createAsyncThunk(`tasks/fetchTask`, async () => {
  const token = getCookie(`token`);
  const response = await axios.get(ApiRoutes.getTask, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("TASK API CALLED=>", response.data);
  return response.data;
});

export const addTasks = createAsyncThunk(`tasks/addTask`, async (taskData) => {
  const token = getCookie(`token`);
  const response = await axios.post(ApiRoutes.postTask, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("TASK API CALLED=>", response.data);
  return response.data;
});

export const deletedTasks = createAsyncThunk(
  `tasks/deleteTask`,
  async (taskId, { rejectWithValue }) => {
    try {
      const token = getCookie(`token`);
      const response = await axios.delete(`${ApiRoutes.deleteTask}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("TASK DELETE API CALLED ==>", response.data);
      return { taskId };
    } catch (error) {
      console.error("Error deleting task:", error);
      return rejectWithValue(error.response?.data ?? "Unknown error occurred");
    }
  }
);

const initialState = {
  task: [],
  isLoading: false,
  status: "pending",
  // addTaskStatus: "idle",
  error: null,
};

export const taskSlice = createSlice({
  name: `task`,
  initialState,
  reducers: {
    resetTaskState: (state) => {
      state.task = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.task = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(addTasks.pending, (state) => {
        state.addTaskStatus = "pending";
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.task.data.push(action.payload.data); // Add the new task to the list
      })
      .addCase(addTasks.rejected, (state, action) => {
        state.addTaskStatus = "failed";
        state.error = action.error.message ?? "Unknown Error";
      })

      .addCase(deletedTasks.pending, (state) => {
        state.deletedTasks = "pending";
      })
      .addCase(deletedTasks.fulfilled, (state, action) => {
        console.log("Deleted Task Response:", action.payload);
        state.status = "succeeded";

        if (!Array.isArray(state.task)) {
          state.task = [];
        }

        state.task.findIndex((task) => task._id !== action.payload.taskId)

        // const index = (state.task = state.task.filter(
        //   (task) => task._id === action.payload.taskId
        // ));
        // fetchTasks();
        // if (index !== -1) {
        //   state.task.splice(index, 1);
        // }
      })
      .addCase(deletedTasks.rejected, (state, action) => {
        state.deletedTasks = "failed";
        state.error = action.payload ?? "Unknown Error";
      });
  },
});

export const { resetTaskState } = taskSlice.actions;

export default taskSlice.reducer;
