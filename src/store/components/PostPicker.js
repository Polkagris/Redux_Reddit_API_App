import React from "react";

function PostPicker({ dispatch, onChange, onClick }) {
  // console.log("e:", e.target.value);
  return (
    <div>
      <input onChange={onChange} type="text" />
      {/* <button onClick={onClick}>Search</button> */}
    </div>
  );
}

export default PostPicker;
