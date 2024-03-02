import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar({ setSearchQuery }) {
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  Navbar.propTypes = {
    setSearchQuery: PropTypes.func.isRequired,
  };

  return (
    <nav className="bg-blue-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-yellow-400">
          Star Wars Galaxy
        </Link>
        <ul className="flex flex-row items-start justify-start space-x-4">
          <li className="relative">
            <Link to="/characters" className="text-white hover:text-yellow-400">
              Characters
            </Link>
            <div className="hidden absolute w-20 h-1 bg-yellow-400 -bottom-1 left-0 transition-transform transform scale-x-0 group-hover:scale-x-100"></div>
          </li>
          <li className="relative">
            <Link to="/planets" className="text-white hover:text-yellow-400">
              Planets
            </Link>
            <div className="hidden absolute w-16 h-1 bg-yellow-400 -bottom-1 left-0 transition-transform transform scale-x-0 group-hover:scale-x-100"></div>
          </li>
          <li className="relative">
            <Link to="/films" className="text-white hover:text-yellow-400">
              Films
            </Link>
            <div className="hidden absolute w-16 h-1 bg-yellow-400 -bottom-1 left-0 transition-transform transform scale-x-0 group-hover:scale-x-100"></div>
          </li>
          <li className="relative">
            <Link to="/favorites" className="text-white hover:text-yellow-400">
              Favorites
            </Link>
            <div className="hidden absolute w-24 h-1 bg-yellow-400 -bottom-1 left-0 transition-transform transform scale-x-0 group-hover:scale-x-100"></div>
          </li>
        </ul>
          <input
            type="text"
            onChange={handleSearchQueryChange}
            placeholder="Search"
            className="bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none"
          />
      </div>
    </nav>
  );
}

export default Navbar;
