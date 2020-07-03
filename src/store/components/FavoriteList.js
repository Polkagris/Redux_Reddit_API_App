import React from "react";
import "./FavoriteList.css";

function FavoriteList({
  favoriteArray,
  localStorageFav,
  onClick,
  deleteFavorite,
  favorites,
}) {
  if (favoriteArray.length > 0) {
    return (
      <ul className={"favoriteSubItemContainer"}>
        {favoriteArray.map((fav, index) => (
          <li
            style={{ opacity: deleteFavorite ? 0.2 : 1 }}
            key={index}
            className={"favoriteSubItem"}
          >
            <button onClick={() => onClick(fav, index)}>{fav}</button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>Sorry no can get</p>;
  }
}

export default FavoriteList;
