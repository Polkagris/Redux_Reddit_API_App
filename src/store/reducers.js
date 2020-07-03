// {
//     selectedSubreddit: 'frontend',
//     popularSubreddits: [],
//     postsBySubreddit: {
//       frontend: {
//         isFetching: true,
//         didInvalidate: false,
//         items: []
//       },
//       reactjs: {
//         isFetching: false,
//         didInvalidate: false,
//         lastUpdated: 1439478405547,
//         items: [
//           {
//             id: 42,
//             title: 'Confusion about Flux and Relay'
//           },
//           {
//             id: 500,
//             title: 'Creating a Simple Application Using React JS and Flux Architecture'
//           }
//         ]
//       }
//     }
//   }

import { combineReducers } from "redux";

import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECIEVE_POST,
  SHOW_SINGLE_POST,
  GO_BACK,
  TO_SINGLEPOST,
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
  REQUEST_POPULAR_SUBS,
  RECIEVE_POPULAR_SUBS,
  GET_FAVORITES,
} from "./actions";

const selectedSubreddit = (state = "reactjs", action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

const popularSubreddits = (
  state = { isFetching: false, items: [] },
  action
) => {
  switch (action.type) {
    case REQUEST_POPULAR_SUBS:
      return {
        ...state,
        isFetching: true,
      };
    case RECIEVE_POPULAR_SUBS:
      return {
        ...state,
        isFetching: false,
        items: action.subredditList,
        recievedAt: action.recievedAt,
      };
    default:
      return state;
  }
};

// IMPORTANT: hvis i reducer: return {...state, action.osv: etc} - så blir det forrige med. feks: [test, og det nye]
const selectedSinglePost = (
  state = { title: "test", selftext: "test", thumbnail: "" },
  action
) => {
  switch (action.type) {
    case SHOW_SINGLE_POST:
      return {
        title: action.post.title,
        selftext: action.post.selftext,
        thumbnail: action.post.thumbnail,
      };
    default:
      return state;
  }
};

const navigation = (state = { page: "home" }, action) => {
  switch (action.type) {
    case GO_BACK:
      return {
        page: action.page,
      };
    case TO_SINGLEPOST:
      return {
        page: action.page,
      };
    default:
      return state;
  }
};

const favorites = (state = [], action) => {
  switch (action.type) {
    case GET_FAVORITES:
      return action.favoriteArray;
    case ADD_TO_FAVORITES:
      return [...state, action.subreddit];
    case DELETE_FROM_FAVORITES:
      return action.favoriteArray;
    default:
      return state;
  }
};

const posts = (
  state = {
    isFetching: false,
    items: [],
    didInvalidate: false,
  },
  action
) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECIEVE_POST:
      return {
        ...state,
        items: action.posts,
        recievedAt: action.recievedAt,
        isFetching: false,
      };
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case RECIEVE_POST:
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  selectedSinglePost,
  navigation,
  favorites,
  popularSubreddits,
});

export default rootReducer;
