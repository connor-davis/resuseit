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
    updateCollector: (state: ICollectorsState, action: any) => {
      state.collectors = [
        ...state.collectors.filter(
          (collector) =>
            collector.collectorIdNumber !== action.payload.collectorIdNumber
        ),
        action.payload,
      ];
    },
    removeCollector: (state: ICollectorsState, action: any) => {
      state.collectors = [
        ...state.collectors.filter(
          (collector) => collector.collectorIdNumber !== action.payload
        ),
      ];
    },
  },
});

let { setCollectors, addCollector, updateCollector, removeCollector } =
  collectorsSlice.actions;

let getCollectors = (state) => state.collectorsReducer.collectors;

export {
  collectorsSlice,
  setCollectors,
  addCollector,
  updateCollector,
  removeCollector,
  getCollectors,
};
