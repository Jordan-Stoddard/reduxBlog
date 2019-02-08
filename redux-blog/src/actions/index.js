import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// Here we're using redux thunk again to 

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  _.chain(getState().posts)
  .map('userId')
  .uniq()
  .forEach(id => dispatch(fetchUser(id)))
  .value()
};

// Using redux thunk we are exporting a function that returns an inner async function, the inner function awaits a response from a get call to an api and then dispatches an action object
// with a type and a payload of the response from the api.
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// Here we're doing the same thing except we're only getting a specific user from that get api call.
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// Fetch User below is an action creator that is a function that calls a function
// The function it calls is _fetchUser
// _fetchUser is a memoized function
// memoize is a lodash method that essentially will never allow you to return the same thing from the inner function twice.

// So in this case, if we fetch users with the id of 1, we can never fetch the user with the id of 1 again
// We can fetch a different user, but we can never fetch the user with the id 1 again.
// If we fetch a different user, say the user with the id of 2, we can then will never return the user with the id of 2 again
// Essentially the function called inside the first argument of the memoize method won't get called if the callback function is trying to return a value that exactly equates to a value that
// returned from that callback function previously.

// -----

// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch)
// };

// This is the memoized function that we're calling inside of our fetchUser Action Creator.

// ------

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// })
