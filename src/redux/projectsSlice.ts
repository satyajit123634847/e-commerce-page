import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Project {
  name: any;
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface ProjectsState {
  projects: Project[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProjectsState = {
  projects: [],
  status: "idle",
};

export const fetchProjects = createAsyncThunk<Project[], string | undefined>(
  "projects/fetchProjects",
  async (query) => {
    const url = query
      ? `https://fakestoreapi.com/products?search=${query}`
      : "https://fakestoreapi.com/products";
    const response = await axios.get(url);
    return response.data;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.status = "idle";
          state.projects = action.payload;
        }
      )
      .addCase(fetchProjects.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default projectsSlice.reducer;
