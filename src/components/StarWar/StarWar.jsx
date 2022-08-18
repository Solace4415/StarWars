import React, { useState } from "react";
import "./starWar.css";
import Spinner from "../Spinner/Spinner";
import Image01 from "../../assets/StarWars.webp";

const StarWar = ({ setMovieSelected, sortedFilms, loading, error }) => {
  const [showTitle, setShowTitle] = useState(false);
  const toggler = () => {
    showTitle ? setShowTitle(false) : setShowTitle(true);
  };

  const updateMovieSelection = (name) => {
    setMovieSelected(name);
  };

  const Titles = sortedFilms?.map((item) => {
    return (
      <div
        key={item.title}
        onClick={() => updateMovieSelection(item.title)}
        className="starwar-content"
      >
        {item.title}
      </div>
    );
  });

  return (
    <div className="starwar">
      <img src={Image01} alt="" />
      <div className="starwar-btn">
        <button onClick={toggler} className="starwar-drpbtn">
          Choose a Star War Movie
          {showTitle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M12 3l12 18h-24z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M12 21l-12-18h24z" />
            </svg>
          )}
        </button>
      </div>

      {error ? (
        <div className="loadingIntro">{error}</div>
      ) : loading ? (
        <Spinner />
      ) : (
        !loading &&
        showTitle && <div className="starwar-drpdownContent">{Titles}</div>
      )}
    </div>
  );
};

export default StarWar;
