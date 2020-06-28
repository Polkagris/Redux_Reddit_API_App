import React from "react";

function PopularSubredditList({ popularSubreddits }) {
  if (popularSubreddits.items.length > 0) {
    return (
      <div>
        <ul>
          {popularSubreddits["items"].map((sub, index) => (
            <li key={index}>
              <div>{sub["title"]}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p>Sorry nothing popular right now...</p>;
  }
}

export default PopularSubredditList;
