import { createSlice } from '@reduxjs/toolkit';

type IModeState = {
  mode: string;
};

let modeSlice = createSlice({
  name: 'user',
  initialState: {
    mode: 'light',
  },
  reducers: {
    setMode: (state: IModeState, action: any) => {
      state.mode = action.payload;
    },
  },
});

let { setMode } = modeSlice.actions;

let getMode = (state) => state.modeReducer.mode;

export { modeSlice, setMode, getMode };
