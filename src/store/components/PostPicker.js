import React from "react";

function PostPicker({ dispatch, onChange, onClick }) {
  // Have regex checker here for symbols and spaces
  // Clear input field
  return (
    <div>
      <input onChange={onChange} type="text" />
    </div>
  );
}

export default PostPicker;
