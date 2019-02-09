import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// Here we're using redux thunk again to return a function inside our action creator which is a async function that calls fetchPosts within it.
// Then since we're also passing in getState we're able to get the posts, and map over the posts and only select the posts with a unique userId property.
// Then for each post iwth a unique userId we're making a dispatch call, passing in the return value of fetchUser, which will be a dispatch with the type FETCH_USER and the payload of
// reponse.data which will be the specific user by id.
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // This section of commented code is exactly the same as the below code inside this function, but unchained.
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  // _.chain is a lodash method that lets you write multiple lodash methods with easier to read syntax.
  _.chain(getState().posts)
  .map('userId')
  .uniq()
  .forEach(id => dispatch(fetchUser(id)))
  .value() // .value is a lodash method that says we're done chaining methods, please return the final result.
};

// Using redux thunk we are exporting a function that returns an inner async function, the inner function awaits a response from a get call to an api and then dispatches an action object
// with a type and a payload of the response from the api.
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// Here we're doing the same thing as in fetchPosts except we're only getting a specific user from that get api call.
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};



// fetchUser below is an action creator that is a function that calls a function
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


// ------

// This is the memoized function that we're calling inside of our fetchUser Action Creator.
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// })
