import React from 'react';

const MovieCard = ({ movie, onCardClick }) => { // Added onCardClick prop
  const { title, name, vote_average, poster_path, release_date, first_air_date, original_language } = movie;

  const movieTitle = title || name;
  const year = release_date ? release_date.split('-')[0] : (first_air_date ? first_air_date.split('-')[0] : 'N/A');

  return (
    <li // Changed div to li if it's directly inside a ul
      className="movie-card bg-dark-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onCardClick(movie)} // Call onCardClick with the movie data
    >
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={movieTitle}
        className="rounded-md w-full h-auto object-cover mb-3 aspect-[2/3]" // Added aspect ratio
      />
      <h3 className="text-white font-semibold text-md line-clamp-1 mb-1">
        {movieTitle}
      </h3>
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>{year}</span>
        {vote_average > 0 && (
          <div className="flex items-center">
            <img src="/star.svg" alt="Rating" className="h-3 w-3 mr-1" />
            <span>{vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
    </li>
  );
};

export default MovieCard;