import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from 'react-use'
import Search from './Search.jsx'
import MovieCard from './MovieCard.jsx'
import Spinner from './Spinner.jsx'
import MovieModal from './MovieModal.jsx'


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [trendingMovies, setTrendingMovies ] = useState([])
  const [loadingTrending, setLoadingTrending]= useState(false)
  const [errorTrending, setErrorTrending] = useState('')

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  useDebounce( () => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

const fetchMovies = async (query = '') => { 
    setLoading(true)
    setError('')

    try {
      const endPoint = query ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
        `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
        const response = await fetch(endPoint, API_OPTIONS)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        if(data.response === 'False') {
            setError(data.Error || 'error fetching movies.')
            setMovies([])
            return
        }

        if(data.results.length === 0) {
            setError('No movies found. Please try a different search term.')
            setMovies([])
            return
        }
        setMovies(data.results || [])
      
    } catch (error) {
        setError('Failed to fetch movies. Please try again later.')
        console.error('Error fetching movies:', error)
    } finally {
        setLoading(false)
    }
}

const trendingMoviesFetch = async () => {
  setLoadingTrending(true)
  setErrorTrending('')

  try {

    const endPoint = `${API_BASE_URL}/trending/movie/week`
    const response = await fetch(endPoint, API_OPTIONS)
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if(data.response === 'False') {
      setErrorTrending(data.Error || 'Error fetching trending movies.')
      setTrendingMovies([])
      return
    }

    if(data.results.length === 0) {
      setErrorTrending('No trending movies found. Please try again later.')
      setTrendingMovies([])
      return
    }
    setTrendingMovies(data.results || [])
    
  } catch (error) {
    setErrorTrending('Failed to fetch trending movies. Please try again later.')
    console.error('Error fetching trending movies:', error)
    
  } finally {
    setLoadingTrending(false)
  }
}

const fetchMovieDetails = useCallback(async (movieId) => {
    if (!movieId) return;
    setLoadingModal(true);
    setSelectedMovie(null); // Clear previous movie details
    setIsModalOpen(true); // Open modal immediately with loading state

    try {
      // Append videos, credits, etc. for more details
      const endPoint = `${API_BASE_URL}/movie/${movieId}?append_to_response=videos,credits,release_dates`;
      const response = await fetch(endPoint, API_OPTIONS);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ status_message: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.status_message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setSelectedMovie(null); // Or set an error state for the modal
      // Optionally close the modal or show an error message within it
    } finally {
      setLoadingModal(false);
    }
  }, []); // API_BASE_URL, API_OPTIONS are stable


  const handleMovieCardClick = (movie) => {
    fetchMovieDetails(movie.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };


useEffect( () => {
  fetchMovies(debouncedSearchTerm)
}, [debouncedSearchTerm])

useEffect(() => {
  trendingMoviesFetch()
}
, [])

  return (
    <div className="relative w-full min-h-screen">
      <div className="pattern"></div>
      <div className="wrapper">
        {/* Hero Section */}
        <section className="hero-section">
          <img src="/hero.png" alt="Movie Hero" className="mx-auto mb-6" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
        </section>
        {/* Search Section */}
        < Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {/* Trending Movies */}
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
            {loadingTrending ? 
              (
                <Spinner />
              ) : 
              errorTrending ? 
              (
                <p className="text-red-500">{errorTrending}</p>
              ) :  
              (
                <ul>
                  {trendingMovies.map((movie, index) => (
                    <li key={movie.id}>
                      <p>{index + 1}</p>
                      <img
                        src={movie.poster_path ?
                          `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'}
                        alt={movie.title}
                      />
                    </li>
                  ))}
                </ul>
              )
            }
          </ul>
        </section>

        {/* All Movies */}
       {/* All Movies Section - Use MovieCard and pass handleMovieCardClick */}
      <section className="all-movies">
        <h2>All Movies</h2>
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : movies.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onCardClick={handleMovieCardClick} />
            ))}
          </ul>
        ) : (
          !error && <p className="text-gray-400">Search for movies or browse popular ones.</p>
        )}
      </section>

       {/* Movie Modal */}
      <MovieModal 
        movie={selectedMovie} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        loading={loadingModal}
      />

      </div>
    </div>
  )
}

export default Home