import { useState, useEffect } from "react";
import axios from "axios";

import Loading from "../components/Loading";

function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://swapi.dev/api/films").then((response) => {
      setFilms(response.data.results);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-star-wars-bg bg-cover bg-center min-h-screen p-8">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {films.map((film, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md text-white transition-transform hover:scale-105 cursor-pointer"
            >
              <h2 className="text-xl text-yellow-400 font-semibold mb-4">{film.title}</h2>
              <p className="text-gray-400 text-lg text-bold mb-2">
                Episode: {film.episode_id} | Release Date: {film.release_date}
              </p>
              <p className="text-gray-400 mb-4">{film.opening_crawl}</p>
              <div className="flex justify-between items-center space-x-24">
                <span className="text-yellow-400">Director: {film.director}</span>
                <span className="text-yellow-400">Producer: {film.producer}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Films;
