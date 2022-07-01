import jsonPlaceHolder from "../api/jsonPlaceholder";

export const fetchPosts = () => {
  /** Bad approach, returns a switch case compiled by babel when using async-await
   * which makes this action creator return a function
   * const res = await jsonPlaceHolder.get('/posts');
   */

  /** Syntax works, but data would not get fetched because of the promise
   * const promise = jsonPlaceHolder.get('/posts');
   */

  /** Redux thunk makes it possible for action creators to return a function. */

  /** If an action creator will return a function, you can use the dispatch function
   * and the getState function manually by providing it as parameters.
   */

  return async (dispatch, getState) => {
    const res = await jsonPlaceHolder.get("/posts");
    const action = {
      type: "FETCH_POSTS",
      payload: res.data,
    };
    dispatch(action);
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const res = await jsonPlaceHolder.get(`/users/${id}`);
    const action = {
      type: "FETCH_USER",
      payload: res.data,
    };
    dispatch(action);
  };
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = [...new Set(getState().posts.map((post) => post.userId))];
  userIds.forEach((userId) => {
    dispatch(fetchUser(userId));
  });
};
