import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMarker {
  name: string;
  toggled: boolean;
}

interface IMarkerState {
  markers: IMarker[];
}

const initialState: IMarkerState = {
  markers: [],
};

const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    addMarker(state, action: PayloadAction<string>) {
      state.markers.push({ name: action.payload, toggled: false });
    },
    toggleMarker(state, action: PayloadAction<string>) {
      const index = state.markers.findIndex(
        (marker) => marker.name === action.payload
      );
      if (index !== -1) {
        state.markers[index].toggled = !state.markers[index].toggled;
      }
    },
    clearMarkers(state) {
      state.markers = [];
    },
  },
});

export const { addMarker, toggleMarker, clearMarkers } = markersSlice.actions;
export const markersReducer = markersSlice.reducer;
