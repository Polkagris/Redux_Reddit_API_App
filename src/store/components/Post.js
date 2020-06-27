import React from "react";
import {
  useParams,
  Link,
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";

function Post({ post, onClick }) {
  return (
    <div>
      <li key={post.id} onClick={() => onClick(post.id)}>
        <Link to={`/post/:postId`}>{post.title}</Link>
      </li>
    </div>
  );
}

export default Post;
