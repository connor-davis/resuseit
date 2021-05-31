import { createSlice } from '@reduxjs/toolkit';

type IUserState = {
  information: any;
};

let userSlice = createSlice({
  name: 'user',
  initialState: {
    information: {},
  },
  reducers: {
    setUserInformation: (state: IUserState, action: any) => {
      state.information = action.payload;
    },
    unsetUserInformation: (state: IUserState, _) => {
      state.information = {};
    },
  },
});

let { setUserInformation, unsetUserInformation } = userSlice.actions;

let getUserInformation = (state) => state.userReducer.information;

export {
  userSlice,
  setUserInformation,
  unsetUserInformation,
  getUserInformation,
};
