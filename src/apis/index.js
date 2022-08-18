import axios from "axios";

const API = axios.create({ baseURL: "https://swapi.dev/api" });

export const fetchFilms = () => API.get("/films");
export const fetchPeople = () => API.get("/people")