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
  fetchPopularSubList,
  deleteFromFavorites,
  getFavoritesFromLocalStorage,
} from "../actions";
import PostPicker from "../components/PostPicker";
import { Switch, Route, useHistory } from "react-router-dom";
import FavoriteList from "../components/FavoriteList";
import PopularSubredditList from "../components/PopularSubredditList";
import "./AsyncPosts.css";

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
    // console.log("CHANGE input:", e.target.value);
    const newSubreddit = e.target.value;
    setSub(newSubreddit);
  };
  const handleSubmit = () => {
    dispatch(selectSubreddit(sub));
    dispatch(fetchPosts(sub));
  };
  const handlePostClick = (id) => {
    console.log("INDEX FROM POSTS:", id);
    dispatch(goToSinglePost(history.location));
    dispatch(showSinglePost(posts, id));
  };

  const handlePopularSubClick = (popularSub) => {
    console.log("Popular sub click:", popularSub);
    dispatch(selectSubreddit(popularSub.display_name));
    dispatch(fetchPosts(popularSub.display_name));
  };

  const retrieveFromLocalStorage = () => {
    const savedData = JSON.parse(localStorage.favorites || null) || [];
    console.log("retrieveFromLocalStorage localStorageArray:", savedData);
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
    console.log(
      "================ Clicked favorite! ===================",
      favoriteSub,
      "index:",
      favorites[index],
      "delete state:",
      deleteFavorite,
      "index:",
      index
    );
    if (deleteFavorite) {
      // localStorage.removeItem(favorites[index]);
      // favorites.splice(index, 1);
      let savedData = JSON.parse(localStorage.favorites || null) || [];
      savedData.splice(index, 1);
      localStorage.favorites = JSON.stringify(savedData);
      console.log("LOCAL STORAGE FAV:", savedData);
      setFavoriteArray(savedData);
      console.log("FAVORITES ARRAY AFTER DELETE!", favoriteArray);
      dispatch(deleteFromFavorites(favoriteArray, index));
      console.log("FAVORITES ARRAY AFTER DELETE DISPATCH!", favoriteArray);
    } else {
      dispatch(selectSubreddit(favoriteSub));
      dispatch(fetchPosts(favoriteSub));
    }
  };

  const deleteFavoriteHandler = () => {
    console.log(" `````````````````````````Delete is:", deleteFavorite);
    setDeleteFavorite(!deleteFavorite);
  };

  useEffect(() => {
    dispatch(fetchPopularSubList());
    dispatch(getFavoritesFromLocalStorage(favoriteArray));
    console.log("%%%%%%%%%%%% USEEFFECT is run on render", favoriteArray);
  }, []);

  useEffect(() => {
    console.log(
      "%%%%%%%%%%%% USEEFFECT is run after changing favoriteArray",
      favoriteArray
    );
    // dispatch(getFavoritesFromLocalStorage(favoriteArray));
    localStorage.favorites = JSON.stringify(favoriteArray);
  }, [favoriteArray]);

  useEffect(() => {
    dispatch(shouldFetchPosts(posts, selectedSubreddit));
  }, [selectedSubreddit]);

  return (
    <div>
      <p>
        Done: Click on post to route to new path with spesific info about post
        Done: Add favourite subreddit - save to local storage
        <p>Popular subreddits https://www.reddit.com/subreddits.json</p>
        <p>Next: Create another thunk</p>
      </p>

      <h2>Next: Create selectors</h2>
      <p>Next: Test reducer</p>
      <p>Next: Test actions</p>
      <p>Next: Create a saga</p>
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
        // localStorageFav={retrieveFromLocalStorage}
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
  const {
    selectedSubreddit,
    postsBySubreddit,
    favorites,
    popularSubreddits,
  } = state;
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
    popularSubreddits,
  };
};

export default connect(mapStateToProps)(AsyncPosts);
