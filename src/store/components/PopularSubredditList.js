import React from "react";
import "./PopularSubredditList.css";

function PopularSubredditList({ popularSubreddits, onClick }) {
  if (popularSubreddits.items.length > 0) {
    return (
      <div>
        <ul className={"popularSubItemContainer"}>
          {popularSubreddits["items"].map((sub, index) => (
            <li key={index} className={"popularSubItem"}>
              {/* Very different from (e) => onClick(sub) that only gives the event object */}
              <button
                onClick={() => {
                  onClick(sub);
                }}
              >
                {sub["title"]}
              </button>
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
