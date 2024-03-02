import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function Characters({ searchQuery }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("https://swapi.dev/api/people/?page=1");

  Characters.propTypes = {
    characters: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchQuery: PropTypes.string.isRequired,
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // Check if there is a next page before making the request
        if (nextPage) {
          const response = await axios.get(nextPage);
          const data = response.data;

          // If this is the first page, set loading to false immediately
          if (characters.length === 0) {
            setLoading(false);
          }

          setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
          setNextPage(data.next);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacters();
  }, [nextPage]);

  const addToFavorites = (character) => {
    if (!character.isFavorite) {
      const characterData = {
        name: character.name,
        height: character.height,
        mass: character.mass,
        hair_color: character.hair_color,
        eye_color: character.eye_color,
      };

      axios
        .post("http://localhost:5000/api/favorites", characterData)
        .then((response) => {
          console.log(response.data.message);
          character.isFavorite = true;
          setCharacters((prevCharacters) => [...prevCharacters]);
        })
        .catch((error) => {
          console.error("Error adding to favorites:", error);
        });
    }
  };

  return (
    <div className="bg-star-wars-bg bg-cover bg-center">
      {characters.length > 0 && !loading ? (
        <>
          <h1 className="text-4xl text-yellow-400 text-center py-8">Star Wars Characters</h1>
          <div className="container mx-auto flex flex-wrap justify-center">
            {characters
              .filter((character) =>
                character.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((character, index) => (
                <div key={index} className="w-64 p-4 m-4 bg-gray-800 rounded-lg shadow-lg">
                  <Link to={`/characters/${character.name}`} className="text-yellow-400 hover:underline">
                    <h2 className="text-xl font-semibold">{character.name}</h2>
                  </Link>
                  <p className="text-gray-400">
                    <span className="font-semibold">Height:</span> {character.height}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Mass:</span> {character.mass}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Birth Year:</span> {character.birth_year}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Skin Color:</span> {character.skin_color}
                  </p>
                  <button
                    onClick={() => addToFavorites(character)}
                    disabled={character.isFavorite}
                    className={`mt-4 px-4 py-2 ${
                      character.isFavorite
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-600"
                    } text-white rounded-lg`}
                  >
                    {character.isFavorite ? "Added to Favorites" : "Add"}
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Characters;
