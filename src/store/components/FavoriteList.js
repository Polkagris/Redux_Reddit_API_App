import React from "react";
import "./FavoriteList.css";

function FavoriteList({ favorites, favoriteArray, localStorageFav }) {
  let favArray = [];
  favArray.push(localStorageFav());

  if (favoriteArray.length > 0) {
    return (
      <ul className={"favoriteSubItemContainer"}>
        {favoriteArray.map((fav, index) => (
          <li key={index} className={"favoriteSubItem"}>
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
