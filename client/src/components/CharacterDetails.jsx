import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CharacterDetails() {
  const { name } = useParams();
  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);


  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/characters/${name}`);
        setCharacter(response.data);
        fetchHomeworld(response.data.homeworld);
        fetchFilms(response.data.films);
      } catch (error) {
        console.error("Error retrieving character details:", error);
      }
    };
    fetchCharacterDetails();
  }, [name]);

  const fetchHomeworld = async (homeworldUrl) => {
    try {
      const response = await axios.get(homeworldUrl);
      setHomeworld(response.data.name);
    } catch (error) {
      console.error("Error fetching homeworld:", error);
    }
  };

  const fetchFilms = async (filmUrls) => {
    try {
      const filmPromises = filmUrls.map(url => axios.get(url));
      const responses = await Promise.all(filmPromises);
      const filmData = responses.map(response => response.data);
      setFilms(filmData);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="character-details">
      <h1 className="character-details__name">{character.name}</h1>
      <p className="character-details__detail">
        <span className="character-details__detail-label">Height:</span> {character.height}
      </p>
      <p className="character-details__detail">
        <span className="character-details__detail-label">Mass:</span> {character.mass}
      </p>
      <p className="character-details__detail">
        <span className="character-details__detail-label">Homeworld:</span> {homeworld}
      </p>
      <p className="character-details__detail">
      <span className="character-details__detail-label">Films:</span>
          {films.map((film) => (
            <span key={film.episode_id} className="character-details__film">
              {film.title}
            </span>
          ))}
      </p>
    </div>
  );
}

export default CharacterDetails;
