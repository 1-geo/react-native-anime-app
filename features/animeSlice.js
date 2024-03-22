import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // array of animes
};

export const animeSlice = createSlice({
  name: "animes",
  initialState,
  reducers: {
    addToAnimes: (state, action) => {
      // take items and append from the payload
      state.items = [...state.items, action.payload];
    },
    removeFromAnimes: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newAnimes = [...state.items];

      if (index >= 0) {
        // remove (splice is array js function)
        newAnimes.splice(index, 1);
      } else {
        console.warn(
          "Cant remove anime (id: ${action.payload.id}) as its not in animes"
        );
      }

      state.items = newAnimes;
    },
  },
});

export const { addToAnimes, removeFromAnimes } = animeSlice.actions;

export const getAnimeWithId = (state, id) =>
  state.animes.items.some((item) => item.id === id);

export default animeSlice.reducer;
