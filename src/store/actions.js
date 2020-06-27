import fetch from "cross-fetch";
import { useRouteMatch, useHistory } from "react-router-dom";

export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECIEVE_POST = "RECIEVE_POST";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const SHOW_SINGLE_POST = "SHOW_SINGLE_POST";
export const GO_BACK = "GO_BACK";
export const TO_SINGLEPOST = "TO_SINGLEPOST";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

export const invalidateSubreddit = (subreddit) => {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
};

export const requestPosts = (subreddit) => {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
};

export const selectSubreddit = (subreddit) => {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
};

export const recievePosts = (subreddit, json) => {
  console.log("JSON from Reddit:", json);
  return {
    type: RECIEVE_POST,
    subreddit,
    posts: json.data.children.map((post) => post.data),
    recievedAt: Date.now(),
  };
};

export const fetchPosts = (subreddit) => {
  return (dispatch) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((result) => result.json())
      .then((json) => dispatch(recievePosts(subreddit, json)));
  };
};

// Fetch posts only when there are no posts
export const shouldFetchPosts = (posts, subreddit) => {
  console.log(
    "################# State from should update: ################### ",
    posts
  );
  const hasPosts = posts.length > 0;
  // console.log("STATE IN STORE:", store.getState());
  return (dispatch) => {
    if (hasPosts) {
      console.log("The app has posts!");
      return;
    } else {
      console.log("So much empty! DO SOMETHING!");
      dispatch(fetchPosts(subreddit));
    }
  };
};

export const showSinglePost = (posts, id) => {
  console.log("POSTS in action showSinglePost>", posts);
  let singlePost = "";
  if (
    posts.map((post) => {
      if (post.id === id) {
        singlePost = post;
      }
      return singlePost;
    })
  )
    console.log("singlePost", singlePost);
  return {
    type: SHOW_SINGLE_POST,
    post: singlePost,
  };
};

export const goBackNavigation = (page) => {
  return {
    type: GO_BACK,
    page,
  };
};

export const goToSinglePost = (page) => {
  return {
    type: TO_SINGLEPOST,
    page,
  };
};

export const addSubredditToFavorites = (subreddit) => {
  return {
    type: ADD_TO_FAVORITES,
    subreddit,
  };
};
