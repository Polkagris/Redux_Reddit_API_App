import React from "react";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectSubreddit, goBackNavigation, goToSinglePost } from "../actions";
import { useEffect } from "react";

function SinglePost({ selectedSinglePost, dispatch }) {
  let match = useRouteMatch();
  let history = useHistory();
  // console.log("¤¤¤¤ history ¤¤¤¤¤:", history);
  // console.log("SELFTEXT:", selectedSinglePost.selftext);

  const goBack = () => {
    // console.log("¤¤¤¤ goBack ¤¤¤¤¤:", history);
    // console.log("¤¤¤¤ goBack ¤¤¤¤¤:", history.location);

    dispatch(goBackNavigation(history.location));
    history.goBack();
  };

  // useEffect(() => {
  //   dispatch(goToSinglePost(history.location));
  // });

  return (
    <div>
      {/* <button onClick={goBack}>Go back</button> */}
      <button onClick={goBack}>Go back</button>
      <h1>{selectedSinglePost.title}</h1>
      <p>{selectedSinglePost.selftext}</p>
      {selectedSinglePost.thumbnail && (
        <img src={selectedSinglePost.thumbnail} alt="" />
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
