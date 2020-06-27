import React from "react";

function FavoriteList({ favorites, favoriteArray, localStorageFav }) {
  let favArray = [];
  favArray.push(localStorageFav());

  // console.log(
  //   "############# retrieveFromLocalStorage ##############",
  //   localStorageFav()
  // );

  console.log(
    "############# retrieveFromLocalStorage favoriteArray ##############",
    favoriteArray
  );

  if (favoriteArray.length > 0) {
    return (
      <ul>
        {favoriteArray.map((fav, index) => (
          <li key={index}>
            <button>{fav}</button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>Sorry no can get</p>;
  }
}

export default FavoriteList;
