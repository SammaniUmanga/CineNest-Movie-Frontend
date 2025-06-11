import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavourite, addToFavourites, removeFavourites } = useMovieContext();
  const favorite = isFavourite(movie.id);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) removeFavourites(movie.id);
    else addToFavourites(movie);
  };
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </Link>

        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
