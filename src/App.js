import React from "react";
import AsyncPosts from "./store/containers/AsyncPosts";
import { Route, Switch, Router } from "react-router-dom";
import SinglePost from "./store/containers/SinglePost";
import Routes from "./Routes";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <AsyncPosts />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
