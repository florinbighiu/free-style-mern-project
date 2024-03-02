import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Loading from "../components/Loading";
import axios from "axios";

function Planets({ searchQuery }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("http://localhost:5000/api/planets/?page=1");

  Planets.propTypes = {
    planets: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchQuery: PropTypes.string.isRequired,
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        if (nextPage) {
          const response = await axios.get(nextPage);
          const data = response.data;

          if (planets.length === 0) {
            setLoading(false);
          }

          setPlanets((prevPlanets) => [...prevPlanets, ...data]);
          setNextPage(data.next);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPlanets();
  }, [nextPage]);

  return (
    <div className="bg-star-wars-bg bg-cover bg-center min-h-screen p-8 text-white">
      {planets.length > 0 && !loading ? (
        <div>
          <h1 className="text-4xl text-yellow-400 text-center py-8">Star Wars Planets</h1>
          <div className="container mx-auto flex flex-wrap justify-center">
            {planets
              .filter((planet) => planet.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((planet, index) => (
                <div key={index} className="w-64 p-4 m-4 bg-gray-800 rounded-lg shadow-lg hover:scale-105 cursor-pointer">
                  <h2 className="text-xl font-semibold text-yellow-400">{planet.name}</h2>
                  <p className="text-gray-400">
                    <span className="font-semibold">Climate:</span> {planet.climate}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Terrain:</span> {planet.terrain}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Population:</span> {planet.population}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Diameter:</span> {planet.diameter}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Planets;
