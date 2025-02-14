import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLocation: {
    lat: null,
    lon: null,
  },
  searchCity: null,
  recentList: [],
  searchBtnClick: false,
}

const WeatherReducer = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentLocation(state, action) {
      state.currentLocation = { lat: action.payload.lat, lon: action.payload.lon };
    },
    setSearchCity(state, action) {
      state.searchCity = action.payload;
    },
    initSearchCity(state) {
      state.searchCity = null;
    },
    addRecentListItem(state, action) {
      const keyword = state.recentList.map(item => item.keyword);

      if (keyword.includes(action.payload)) {
        const newList = state.recentList.filter(item => item.keyword !== action.payload);
        newList.unshift({ id: Date(), keyword: action.payload });
        state.recentList = newList;
      } else {
        state.recentList.unshift({ id: Date(), keyword: action.payload });
      }
    },
    removeRecentListItem(state, action) {
      const newList = state.recentList.filter(item => item.keyword !== action.payload);
      state.recentList = newList;
    },
    clearRecentList(state) {
      state.recentList = [];
    },
    clickSearchBtn(state, action) {
      state.searchBtnClick = action.payload;
    }
  }
});

export const { setCurrentLocation, setSearchCity, initSearchCity, addRecentListItem, removeRecentListItem, clearRecentList, clickSearchBtn } = WeatherReducer.actions;
export default WeatherReducer.reducer;