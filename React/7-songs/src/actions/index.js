/** Action creator */
export const selectSong = (song) => {
  return {
    type: "SONG_SELECTED", //type is required
    payload: song, //payload is not required
  };
};
