import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import "./starWarsCharactersDetails.css";

const StarWarsCharactersDetails = ({ movieSelected, sortedFilms }) => {
  const [direction, setDirection] = useState("ascending");
  const [currentChild, setCurrentChild] = useState("all");
  const [totalHeight, setTotalHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [crawler, setCrawler] = useState("");
  const [characters_context, setCharacters] = useState([]);
  const [backupData, setBackupData] = useState([]);

  // fn to get opening crawler of a selected movie
  useEffect(() => {
    const getCrawler = () => {
      sortedFilms?.filter(
        (item) => item.title === movieSelected && setCrawler(item.opening_crawl)
      );
    };
    getCrawler();
  }, [movieSelected, sortedFilms]);

  // fn to get all the characters with gender and heights
  useEffect(() => {
    const getCharacters = () => {
      sortedFilms?.filter(async (item) => {
        if (item.title === movieSelected) {
          setLoading(true);
          const res = await Promise.all(
            item?.characters?.map((link) => axios.get(link))
          );
          const tabledata = res.map((item) => {
            return {
              name: item.data.name,
              height: item.data.height,
              gender: item.data.gender,
            };
          });
          setLoading(false);
          setCharacters(tabledata);
          setBackupData(tabledata);
        }
      });
    };
    getCharacters();
  }, [movieSelected, sortedFilms]);

  //fn to sort all the characters in ascending order/descending order
  const onSortCharacters = (direction) => {
    if (direction === "ascending") {
      let sortedCharacter = characters_context;
      setCharacters([]);
      const newCharacters = sortedCharacter.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      setCharacters(newCharacters);
      setDirection("descending");
    } else if (direction === "descending") {
      let sortedCharacters = characters_context;
      setCharacters([]);
      const newCharacters = sortedCharacters
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .reverse();
      setCharacters(newCharacters);
      setDirection("ascending");
    }
  };

  //fn to sort allthe characters using gender
  useEffect(() => {
    const sortByGender = () => {
      if (currentChild === "Male Only") {
        setCharacters([]);
        const newCharacters = backupData.filter(
          (item) => item.gender === "male"
        );
        setCharacters(newCharacters);
      } else if (currentChild === "Female Only") {
        setCharacters([]);
        const newCharacters = backupData.filter(
          (item) => item.gender === "female"
        );
        setCharacters(newCharacters);
      } else {
        setCharacters(backupData);
      }
    };
    sortByGender();
  }, [currentChild, backupData]);

  // fn to get all height of all characters of a selected movie
  useEffect(() => {
    const getAllHeight = async () => {
      const newCharacter = characters_context.filter(
        (item) => item.height !== "unknown"
      );
      const allSum = newCharacter.reduce((a, b) => +a + +b.height, 0);
      setTotalHeight((prevState) => (prevState = allSum));
    };
    getAllHeight();
  }, [characters_context]);

  // if page is still loading on api request, show loading on screen
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="characters">
        {movieSelected && <h1>Movie: {movieSelected}</h1>}

        <div class="characters-crawler">
          <p>{crawler} </p>
        </div>

        {characters_context.length > 0 && (
          <div className="selection">
            <button
              onClick={(e) => setCurrentChild("all")}
              className={currentChild === "all" ? "selected" : "non_selected"}
            >
              All
            </button>
            <button
              onClick={(e) => setCurrentChild("Male Only")}
              className={
                currentChild === "Male Only" ? "selected" : "non_selected"
              }
            >
              Male Only
            </button>
            <button
              onClick={(e) => setCurrentChild("Female Only")}
              className={
                currentChild === "Female Only" ? "selected" : "non_selected"
              }
            >
              Female Only
            </button>
          </div>
        )}
        {characters_context.length > 0 && (
          <div className="characters-table">
            <table>
              <thead onClick={() => onSortCharacters(direction)}>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Height</th>
                </tr>
              </thead>

              <tbody>
                {characters_context?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                    <td>{item.height}cm</td>
                  </tr>
                ))}
                <tr>
                  <td>Total Characters: {characters_context.length}</td>
                  <td></td>
                  <td>
                    Total Heights: {totalHeight}cm
                    <p>
                      {`(${Math.round(totalHeight / 30.48)}ft/${Math.round(
                        totalHeight / 2.54
                      )}in)`}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default StarWarsCharactersDetails;
