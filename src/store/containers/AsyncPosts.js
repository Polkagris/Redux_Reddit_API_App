// {
//     selectedSubreddit: 'frontend',
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

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PostList from "../components/PostList";
import {
  fetchPosts,
  selectSubreddit,
  shouldFetchPosts,
  showSinglePost,
  goToSinglePost,
  addSubredditToFavorites,
} from "../actions";
import PostPicker from "../components/PostPicker";
import { Switch, Route, useHistory } from "react-router-dom";
import FavoriteList from "../components/FavoriteList";

function AsyncPosts({
  posts,
  subreddit,
  dispatch,
  selectedSubreddit,
  isFetching,
  recievedAt,
  favorites,
}) {
  // console.log("POSTS:", posts);
  const [sub, setSub] = useState("");

  const [
    favoriteArrayFromLocalStorage,
    setFavoriteArrayFromLocalStorage,
  ] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  let history = useHistory();

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log("CHANGE input:", e.target.value);
    const newSubreddit = e.target.value;
    setSub(newSubreddit);
  };

  const handleSubmit = () => {
    dispatch(selectSubreddit(sub));
    dispatch(fetchPosts(sub));
  };

  const handlePostClick = (id) => {
    // dispatch action to show a post
    console.log("INDEX FROM POSTS:", id);
    dispatch(goToSinglePost(history.location));
    dispatch(showSinglePost(posts, id));
  };

  const retrieveFromLocalStorage = () => {
    const savedData = JSON.parse(localStorage.favorites || null) || [];
    console.log("retrieveFromLocalStorage localStorageArray:", savedData);
    return savedData;
  };

  const [favoriteArray, setFavoriteArray] = useState([
    retrieveFromLocalStorage(),
  ]);
  const addToFavoritesHandler = (subreddit) => {
    setFavoriteArray(favoriteArray.concat(subreddit));
    localStorage.favorites = JSON.stringify(favoriteArray);
  };

  useEffect(() => {
    localStorage.favorites = JSON.stringify(favoriteArray);
  }, [favoriteArray]);

  useEffect(() => {
    dispatch(shouldFetchPosts(posts, selectedSubreddit));
  }, [selectedSubreddit]);

  return (
    <div>
      <p>
        Done: Click on post to route to new path with spesific info about post
      </p>
      <h2>Add favourite subreddit - save to local storage</h2>
      <p>Popular subreddits https://www.reddit.com/subreddits.json</p>
      <p>Next: Create another thunk</p>
      <p>Next: Create selectors</p>
      <p>Next: Test reducer</p>
      <p>Next: Test actions</p>
      <p>Next: Create a saga</p>
      <p>Next: Create error handling for thunk</p>
      <h1>{subreddit}</h1>
      <PostPicker onChange={handleInputChange} onClick={handleSubmit} />
      {sub && <button onClick={handleSubmit}>Search</button>}

      {sub && (
        <button onClick={() => addToFavoritesHandler(sub)}>
          Add to favourites
        </button>
      )}

      <FavoriteList
        favorites={favorites}
        localStorageFav={retrieveFromLocalStorage}
        favoriteArray={favoriteArray}
      />

      {!isFetching && <h2>Posts</h2>}
      {isFetching && <h2>Loading...</h2>}
      <p>
        Last updated:{" "}
        {!recievedAt ? (
          <div>Fetching date...</div>
        ) : (
          new Date(recievedAt).toLocaleTimeString()
        )}
      </p>

      {posts.length > 0 && <PostList posts={posts} onClick={handlePostClick} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { selectedSubreddit, postsBySubreddit, favorites } = state;
  console.log("STATE:", postsBySubreddit);
  const { isFetching, recievedAt, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || { isFetching: true, posts: [] };
  return {
    posts,
    selectedSubreddit,
    isFetching,
    recievedAt,
    favorites,
  };
};

export default connect(mapStateToProps)(AsyncPosts);
