import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import { selectSubreddit, fetchPosts } from "./actions";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )
  )
);

// store.dispatch(selectSubreddit("reactjs"));
store.dispatch(fetchPosts("reactjs")).then(() => console.log(store.getState()));
