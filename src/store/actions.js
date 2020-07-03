import fetch from "cross-fetch";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECIEVE_POST = "RECIEVE_POST";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const SHOW_SINGLE_POST = "SHOW_SINGLE_POST";
export const GO_BACK = "GO_BACK";
export const TO_SINGLEPOST = "TO_SINGLEPOST";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REQUEST_POPULAR_SUBS = "REQUEST_POPULAR_SUBS";
export const RECIEVE_POPULAR_SUBS = "RECIEVE_POPULAR_SUBS";
export const DELETE_FROM_FAVORITES = "DELETE_FROM_FAVORITES";
export const GET_FAVORITES = "GET_FAVORITES";

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

// Thunk
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
  const hasPosts = posts.length > 0;
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

// POPULAR SUBS
export const addSubredditToFavorites = (subreddit) => {
  return {
    type: ADD_TO_FAVORITES,
    subreddit,
  };
};

export const requestPopularSubList = () => {
  return {
    type: REQUEST_POPULAR_SUBS,
  };
};
export const recievePopularSubList = (json) => {
  console.log("JSON from Reddit popular subs:", json);
  return {
    type: RECIEVE_POPULAR_SUBS,
    subredditList: json.map((sub) => sub.data),
    recievedAt: Date.now(),
  };
};

export const fetchPopularSubList = () => {
  return (dispatch) => {
    dispatch(requestPopularSubList());

    return fetch(`https://www.reddit.com/subreddits.json`)
      .then((result) => result.json())
      .then((json) => {
        dispatch(recievePopularSubList(json.data.children));
      });
  };
};

export const deleteFromFavorites = (favoriteArray, index) => {
  return {
    type: DELETE_FROM_FAVORITES,
    favoriteArray,
  };
};

export const getFavoritesFromLocalStorage = (favoriteArray) => {
  return {
    type: GET_FAVORITES,
    favoriteArray,
  };
};
