import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './appStateSlice.js';

export default configureStore({
  reducer: {
    appState: appStateReducer,
  }
})
