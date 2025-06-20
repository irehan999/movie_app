import React from 'react';
import Spinner from './Spinner'; 

const MovieModal = ({ movie, isOpen, onClose, loading }) => {
  if (!isOpen) return null;

  const getTrailerKey = () => {
    if (movie?.videos?.results) {
      const trailer = movie.videos.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );
      return trailer ? trailer.key : null;
    }
    return null;
  };

  const trailerKey = getTrailerKey();

  const formatCurrency = (number) => {
    if (number === undefined || number === null) return 'N/A';
    return '$' + number.toLocaleString();
  };

  const formatVoteCount = (count) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(0) + 'K';
    return count?.toString() || '0';
  };


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={onClose} 
    >
      <div 
        // Removed tailwind-scrollbar classes, will use global CSS for scrollbar
        className="bg-dark-100 text-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-8 relative movie-modal-scrollbar" 
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-white text-3xl z-20"
        >
          &times; 
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : !movie ? (
          <p className="text-center text-xl py-10">Movie details not found.</p>
        ) : (
          <div>
            {/* Header Section with Ratings */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-1">{movie.title || movie.name}</h2>
                <div className="flex flex-wrap items-center text-gray-400 text-xs sm:text-sm space-x-2 sm:space-x-3">
                  <span>{movie.release_date?.split('-')[0]}</span>
                  {movie.release_dates?.results?.find(r => r.iso_3166_1 === 'US')?.release_dates[0]?.certification &&
                    <>
                      <span className="text-gray-600">|</span>
                      <span>{movie.release_dates.results.find(r => r.iso_3166_1 === 'US').release_dates[0].certification}</span>
                    </>
                  }
                  {movie.runtime && 
                    <>
                      <span className="text-gray-600">|</span>
                      <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                    </>
                  }
                </div>
              </div>
              {movie.vote_average > 0 && (
                <div className="flex items-center space-x-2 bg-dark-200 px-3 py-1.5 rounded-lg mt-2 sm:mt-0">
                  <img src="/star.svg" alt="Rating" className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {movie.vote_average.toFixed(1)}
                    <span className="text-xs text-gray-400">/10</span>
                  </span>
                  <span className="text-xs text-gray-400">({formatVoteCount(movie.vote_count)})</span>
                </div>
              )}
            </div>

            {/* Main Content: Poster, Backdrop/Trailer */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 sm:gap-6 mb-6">
              <div className="md:col-span-2">
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} 
                  alt={movie.title} 
                  className="rounded-lg w-full shadow-lg aspect-[2/3] object-cover"
                />
              </div>
              <div className="md:col-span-5">
                {trailerKey ? (
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : movie.backdrop_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} 
                    alt={`${movie.title} backdrop`} 
                    className="rounded-lg w-full h-auto object-cover shadow-lg aspect-video"
                  />
                ) : (
                  <div className="bg-dark-200 aspect-video rounded-lg flex items-center justify-center text-gray-500">No backdrop or trailer available</div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="font-semibold text-lg text-gray-200 mb-2">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres?.map(genre => (
                      <span 
                        key={genre.id} 
                        className="bg-gray-700 text-gray-200 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium shadow transition-colors duration-150" // Updated Genre Styling
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-200 mb-1">Overview</h4>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{movie.overview}</p>
                </div>
              </div>
              <div className="lg:col-span-1 flex flex-col items-start lg:items-end">
                {movie.homepage && (
                  <div className="mt-0 lg:mt-8 w-full lg:w-auto">
                    <a 
                      href={movie.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block text-center w-full lg:w-auto bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-2.5 px-6 rounded-md hover:opacity-90 transition shadow-md"
                    >
                      Visit Homepage &rarr;
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700 space-y-3 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                {movie.release_date && <p><strong className="text-gray-200 font-medium">Release Date:</strong> <span className="text-purple-400">{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>}
                {movie.status && <p><strong className="text-gray-200 font-medium">Status:</strong> <span className="text-purple-400">{movie.status}</span></p>}
                {movie.original_language && <p><strong className="text-gray-200 font-medium">Language:</strong> <span className="text-purple-400">{movie.original_language.toUpperCase()}</span></p>}
                {movie.budget > 0 && <p><strong className="text-gray-200 font-medium">Budget:</strong> <span className="text-purple-400">{formatCurrency(movie.budget)}</span></p>}
                {movie.revenue > 0 && <p><strong className="text-gray-200 font-medium">Revenue:</strong> <span className="text-purple-400">{formatCurrency(movie.revenue)}</span></p>}
                {movie.tagline && <p className="sm:col-span-2 md:col-span-3"><strong className="text-gray-200 font-medium">Tagline:</strong> <span className="text-purple-400 italic">"{movie.tagline}"</span></p>}
              </div>
            </div>
              
            {movie.production_companies?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="font-semibold text-lg text-gray-200 mb-2">Production Companies</h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {movie.production_companies.map(company => (
                    <span key={company.id} className="text-xs sm:text-sm text-gray-400">{company.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;