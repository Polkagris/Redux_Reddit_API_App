import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { goBackNavigation } from "../actions";
import ReactPlayer from "react-player/lazy";

function SinglePost({ selectedSinglePost, dispatch }) {
  let history = useHistory();
  const goBack = () => {
    dispatch(goBackNavigation(history.location));
    history.goBack();
  };

  // if (selectedSinglePost.video["media"]) {
  //   console.log("VIDEO:", selectedSinglePost.video);
  // } else {
  //   console.log("NOT DEFINED VIDEO secure_media!", selectedSinglePost.video);
  // }

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <h1>{selectedSinglePost.title}</h1>
      <p>{selectedSinglePost.selftext}</p>
      {selectedSinglePost.thumbnail && (
        <img src={selectedSinglePost.thumbnail} alt="" />
      )}
      {selectedSinglePost.isVideo === true && (
        <ReactPlayer
          url={
            selectedSinglePost.video.media.reddit_video.scrubber_media_url
              ? selectedSinglePost.video.media.reddit_video.scrubber_media_url
              : selectedSinglePost.video.media.reddit_video.fallback_url
          }
          playing
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { selectedSinglePost } = state;
  return {
    selectedSinglePost,
  };
};

export default connect(mapStateToProps)(SinglePost);
