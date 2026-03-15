import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  loading: boolean;
  data: any[];
  error: string | null;
}

const initialState: DashboardState = {
  loading: false,
  data: [],
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = dashboardSlice.actions;
export default dashboardSlice.reducer;