import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchfilms } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import StarWar from "./components/StarWar/StarWar";
import StarWarsCharactersDetails from "./components/Characters/StarWarsCharactersDetails";

const App = () => {
  const dispatch = useDispatch();
  const [movieSelected, setMovieSelected] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchfilms(setError));
  }, [dispatch]);

  const data = useSelector((state) => state.films);
  const sortedFilms = data?.films?.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );

  useEffect(() => {
    !sortedFilms ? setLoading(true) : setLoading(false);
  }, [sortedFilms]);

  return (
    <div>
      <StarWar
        setMovieSelected={setMovieSelected}
        sortedFilms={sortedFilms}
        error={error}
        loading={loading}
      />
      <StarWarsCharactersDetails
        movieSelected={movieSelected}
        sortedFilms={sortedFilms}
      />
    </div>
  );
};

export default App;
