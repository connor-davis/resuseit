import { createSlice } from '@reduxjs/toolkit';

type ICollectorsState = {
  collectors: any;
};

let collectorsSlice = createSlice({
  name: 'collectors',
  initialState: {
    collectors: [],
  },
  reducers: {
    setCollectors: (state: ICollectorsState, action: any) => {
      state.collectors = action.payload;
    },
    addCollector: (state: ICollectorsState, action: any) => {
      state.collectors = [...state.collectors, action.payload];
    },
  },
});

let { setCollectors, addCollector } = collectorsSlice.actions;

let getCollectors = (state) => state.collectorsReducer.collectors;

export { collectorsSlice, setCollectors, addCollector, getCollectors };
