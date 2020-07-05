import React from "react";
import Post from "./Post";
import { useRouteMatch, Route, Switch, Link } from "react-router-dom";
import SinglePost from "../containers/SinglePost";

function PostList({ posts, onClick }) {
  // let match = useRouteMatch();
  // console.log("¤¤¤¤ MATCH ¤¤¤¤¤:", match);

  return (
    <div>
      <Switch>
        <Route path={"/post/:id"}>
          <SinglePost />
        </Route>
        <Route path={`/`}>
          <ul>
            {posts.map((post) => (
              <Post post={post} key={post.id} onClick={onClick} />
            ))}
          </ul>
        </Route>
      </Switch>
    </div>
  );
}

export default PostList;
