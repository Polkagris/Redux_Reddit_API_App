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
  fetchPopularSubList,
  deleteFromFavorites,
  getFavoritesFromLocalStorage,
} from "../actions";
import PostPicker from "../components/PostPicker";
import { Switch, Route, useHistory } from "react-router-dom";
import FavoriteList from "../components/FavoriteList";
import PopularSubredditList from "../components/PopularSubredditList";
import "./AsyncPosts.css";
import {
  selectFavorites,
  selectPopularSubreddits,
  selectCurrentSubreddit,
} from "../reducers";

function AsyncPosts({
  posts,
  subreddit,
  dispatch,
  selectedSubreddit,
  isFetching,
  recievedAt,
  favorites,
  popularSubreddits,
}) {
  const [sub, setSub] = useState("");
  const [deleteFavorite, setDeleteFavorite] = useState(false);
  let history = useHistory();

  const handleInputChange = (e) => {
    e.preventDefault();
    const newSubreddit = e.target.value;
    setSub(newSubreddit);
  };
  const handleSubmit = () => {
    dispatch(selectSubreddit(sub));
    dispatch(fetchPosts(sub));
  };
  const handlePostClick = (id) => {
    console.log("POST id:", id);
    dispatch(goToSinglePost(history.location));
    dispatch(showSinglePost(posts, id));
  };

  const handlePopularSubClick = (popularSub) => {
    dispatch(selectSubreddit(popularSub.display_name));
    dispatch(fetchPosts(popularSub.display_name));
  };

  const retrieveFromLocalStorage = () => {
    const savedData = JSON.parse(localStorage.favorites || null) || [];
    return savedData;
  };

  const [favoriteArray, setFavoriteArray] = useState(
    retrieveFromLocalStorage()
  );
  const addToFavoritesHandler = (subreddit) => {
    dispatch(addSubredditToFavorites(subreddit));
    setFavoriteArray(favoriteArray.concat(subreddit));
    localStorage.favorites = JSON.stringify(favoriteArray);
  };

  const handleFavoriteSubClick = (favoriteSub, index) => {
    if (deleteFavorite) {
      let savedData = JSON.parse(localStorage.favorites || null) || [];
      savedData.splice(index, 1);
      localStorage.favorites = JSON.stringify(savedData);
      setFavoriteArray(savedData);
      dispatch(deleteFromFavorites(favoriteArray, index));
    } else {
      dispatch(selectSubreddit(favoriteSub));
      dispatch(fetchPosts(favoriteSub));
    }
  };

  const deleteFavoriteHandler = () => {
    setDeleteFavorite(!deleteFavorite);
  };

  useEffect(() => {
    dispatch(fetchPopularSubList());
    dispatch(getFavoritesFromLocalStorage(favoriteArray));
  }, []);

  useEffect(() => {
    localStorage.favorites = JSON.stringify(favoriteArray);
  }, [favoriteArray]);

  useEffect(() => {
    dispatch(shouldFetchPosts(posts, selectedSubreddit));
  }, [selectedSubreddit]);

  return (
    <div>
      <div>
        Done: Click on post to route to new path with spesific info about post
        Done: Add favourite subreddit - save to local storage
        <p>Popular subreddits https://www.reddit.com/subreddits.json</p>
        <p>Next: Create another thunk</p>
      </div>

      <h2>Next: Create selectors</h2>
      <p>Next: Test reducer</p>
      <p>Next: Test actions</p>
      <p>Next: Create a saga</p>
      <p>
        Next: CFix /:id routing so not every link gets purple when one is
        clicked
      </p>
      <p>
        Next: Save all API responses to local storage for a period and check if
        need to update
      </p>
      <p>Next: Create error handling for thunk</p>

      <div className={"searchSubContainer"}>
        <h1>{selectedSubreddit}</h1>
        <div>Search for Subreddit</div>
        <PostPicker onChange={handleInputChange} onClick={handleSubmit} />
        {sub && <button onClick={handleSubmit}>Search</button>}

        {sub && (
          <button onClick={() => addToFavoritesHandler(sub)}>
            Add to favourites
          </button>
        )}
      </div>

      <div className={"popularSubContainer"}>
        <h2>Popular Subs</h2>
        <div className={"PopularSubredditList"}>
          <PopularSubredditList
            popularSubreddits={popularSubreddits}
            onClick={handlePopularSubClick}
          />
        </div>
      </div>

      <h2>My favorite subs</h2>
      <FavoriteList
        deleteFavorite={deleteFavorite}
        favoriteArray={favoriteArray}
        onClick={handleFavoriteSubClick}
        favorites={favorites}
      />
      <button
        style={{ backgroundColor: deleteFavorite ? "#DF3A01" : null }}
        onClick={deleteFavoriteHandler}
      >
        Delete favorite
      </button>

      {!isFetching && <h2>Posts</h2>}
      {isFetching && <h2>Loading...</h2>}
      <div>
        Last updated:{" "}
        {!recievedAt ? (
          <div>Fetching date...</div>
        ) : (
          new Date(recievedAt).toLocaleTimeString()
        )}
      </div>

      {posts.length > 0 && <PostList posts={posts} onClick={handlePostClick} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: selectCurrentSubreddit(state).posts,
    selectedSubreddit: selectCurrentSubreddit(state).selectedSubreddit,
    isFetching: selectCurrentSubreddit(state).isFetching,
    recievedAt: selectCurrentSubreddit(state).recievedAt,
    favorites: selectFavorites(state),
    popularSubreddits: selectPopularSubreddits(state),
  };
};

export default connect(mapStateToProps)(AsyncPosts);
