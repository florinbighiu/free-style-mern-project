import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function FilmDetails({ match }) {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const filmIndex = match.params.filmIndex;

    const fetchFilmDetails = async () => {
      try {
        const response = await axios.get(`http://swapi.dev/api/films/${filmIndex}`);
        setFilm(response.data);
      } catch (error) {
        console.error("Error fetching film details:", error);
      }
    }

    fetchFilmDetails();
  }, [match.params.filmIndex]);

  if (!film) {
    return <div>Loading film details...</div>;
  }

  return (
    <div>
      <h1>{film.title}</h1>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <p>Release Date: {film.release_date}</p>
      <p>Opening Crawl: {film.opening_crawl}</p>
    </div>
  );
}

FilmDetails.propTypes = {
  match: PropTypes.object.isRequired,
};

export default FilmDetails;
