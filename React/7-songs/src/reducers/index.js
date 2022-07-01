import { combineReducers } from "redux";

const songsReducer = () => {
  return [
    { title: "All Star", duration: "3:15" },
    { title: "Le Festin", duration: "4:05" },
    { title: "Married Life", duration: "3:55" },
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === "SONG_SELECTED") {
    return action.payload;
  }
  return selectedSong;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
})