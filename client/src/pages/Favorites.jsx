import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Favorites({ searchQuery }) {
  const [favorites, setFavorites] = useState([]);

  Favorites.propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchQuery: PropTypes.string.isRequired,
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    axios
      .get("http://localhost:5000/api/favorites")
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  };

  const handleRemove = async (characterId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/favorites/${characterId}`);

      if (response.status === 200) {
        setFavorites(favorites.filter((character) => character._id !== characterId));
      } else {
        console.error('Failed to remove favorite card');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-star-wars-bg bg-cover bg-center min-h-screen p-8 text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl text-yellow-400 text-center py-8">Your Star Wars Favorites</h1>
        <div className="flex flex-wrap justify-center">
          {favorites
            .filter((character) => character.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((character) => (
              <div key={character._id} className="w-64 p-4 m-4 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-yellow-400">{character.name}</h2>
                <p className="text-gray-400">
                  <span className="font-semibold">Height:</span> {character.height}
                </p>
                <p className="text-gray-400">
                  <span className="font-semibold">Mass:</span> {character.mass}
                </p>
                <p className="text-gray-400">
                  <span className="font-semibold">Hair Color:</span> {character.hair_color}
                </p>
                <p className="text-gray-400">
                  <span className="font-semibold">Eye Color:</span> {character.eye_color}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => handleRemove(character._id)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
