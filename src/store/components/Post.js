import React from "react";
import "./Post.css";
import {
  useParams,
  Link,
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";

function Post({ post, onClick }) {
  return (
    <div className="postWrapper">
      <li
        key={post.id}
        className="linkContainer"
        onClick={() => onClick(post.id)}
      >
        <img src={post.thumbnail} alt="" className="thumbnail" />
        <Link to={`/post/${post.id}`} className="link">
          {post.title}
        </Link>
      </li>
    </div>
  );
}

export default Post;
