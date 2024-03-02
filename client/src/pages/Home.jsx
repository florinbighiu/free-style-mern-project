import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-star-wars-bg bg-cover bg-center min-h-screen p-8 text-white">
      <section className="text-center py-16">
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Welcome to the SWAPI React App!</h1>
        <p className="text-xl">
          This app utilizes the Star Wars API (SWAPI) to provide information about the Star Wars universe.
        </p>
      </section>

      <div className="flex justify-center space-x-4 h-3/4">
        <div className="bg-gray-800 w-full md:w-1/3 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-400">Explore Films</h2>
          <p>
            Browse through a collection of Star Wars films and get detailed information about each film, including characters, planets, and starships.
          </p>
        </div>

        <div className="bg-gray-800 w-full md:w-1/3 rounded-lg p-6 shadow-lg">
          <Link to="/api/characters" className="text-yellow-400 hover:underline">
            <h2 className="text-2xl font-semibold">Discover Characters</h2>
          </Link>
          <p>
            Learn about various characters from the Star Wars universe, including their profiles, appearances in films, and related species.
          </p>
        </div>

        <div className="bg-gray-800 w-full md:w-1/3 rounded-lg p-6 shadow-lg">
          <Link to="/api/planets" className="text-yellow-400 hover:underline">
            <h2 className="text-2xl font-semibold">Visit Planets</h2>
          </Link>
          <p>
            Dive into the details of different planets featured in the Star Wars films, including climate, population, and notable residents.
          </p>
        </div>
      </div>

      <section className="text-center py-8">
        <h2 className="text-3xl font-extrabold text-yellow-400">Start Exploring Now!</h2>
      </section>
    </div>
  );
};

export default Home;
