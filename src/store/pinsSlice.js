import { createSlice } from '@reduxjs/toolkit';

const getInitialSavedPins = () => {
  try {
    const raw = localStorage.getItem('pulse_saved_pins');
    return raw ? JSON.parse(raw) : ['ev_hack_01', 'ev_dance_02'];
  } catch {
    return [];
  }
};

const pinsSlice = createSlice({
  name: 'pins',
  initialState: {
    savedPinIds: getInitialSavedPins(),
  },
  reducers: {
    toggleSavePin(state, action) {
      const id = action.payload;
      if (state.savedPinIds.includes(id)) {
        state.savedPinIds = state.savedPinIds.filter(item => item !== id);
      } else {
        state.savedPinIds.push(id);
      }
      localStorage.setItem('pulse_saved_pins', JSON.stringify(state.savedPinIds));
    },
  },
});

export const { toggleSavePin } = pinsSlice.actions;
export default pinsSlice.reducer;
