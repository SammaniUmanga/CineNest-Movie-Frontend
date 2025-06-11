import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const fetchedMovieDetails = await getMovieDetails(id);
        if (!fetchedMovieDetails) throw new Error("Movie not found");
        setMovie(fetchedMovieDetails);
      } catch {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (loading)
    return <div className="loading">🎬 Loading movie details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div className="error-message">Movie not found.</div>;

  return (
    <motion.div
      className="movie-detail"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>{movie.title}</h2><br/>
      <p className="tagline">{movie.tagline}</p>
      <div className="detail-content">
        <motion.img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          whileHover={{ scale: 1.05 }}
        />
        <div className="info">
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} min
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Language:</strong> {movie.original_language.toUpperCase()}
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            <CountUp end={movie.vote_average} decimals={1} duration={1.5} /> /
            10
          </p>
          <p>
            <strong>Votes:</strong>{" "}
            <CountUp end={movie.vote_count} duration={1.5} separator="," />
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
          {movie.homepage && (
            <p>
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 Visit Official Site
              </a>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default MovieDetails;
