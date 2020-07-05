const {
  selectSubreddit,
  requestPosts,
  SELECT_SUBREDDIT,
  REQUEST_POSTS,
  RECIEVE_POST,
} = require("../actions");

describe("actions", () => {
  it("should create an action to select a subreddit", () => {
    const subreddit = "reactjs";
    const expectedAction = {
      type: SELECT_SUBREDDIT,
      subreddit,
    };
    expect(selectSubreddit(subreddit)).toEqual(expectedAction);
  });

  it("should create an action to request posts", () => {
    const subreddit = "reactjs";
    const expectedAction = {
      type: REQUEST_POSTS,
      subreddit,
    };
    expect(requestPosts(subreddit)).toEqual(expectedAction);
  });

  //   it("should create an action to recieve posts", () => {
  //     const subreddit = "reactjs";
  //     const json = [];
  //     const expectedAction = {
  //       type: RECIEVE_POST,
  //       subreddit,
  //       posts: json,
  //       recievedAt,
  //     };
  //     expect(requestPosts(subreddit, json)).toEqual(expectedAction);
  //   });
});

// export const recievePosts = (subreddit, json) => {
//     console.log("JSON from Reddit:", json);
//     return {
//       type: RECIEVE_POST,
//       subreddit,
//       posts: json.data.children.map((post) => post.data),
//       recievedAt: Date.now(),
//     };
//   };
