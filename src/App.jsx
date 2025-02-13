import React, { useState, useEffect } from 'react'
import Search from './Components/Search'
import MovieList from './Components/MovieList';
import Loader from './Components/Loader';
import { useDebounce } from 'react-use';
import { showTrendingMovies, updateSearchCount } from './appwrite';
const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}
const App = () =>
{
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMassage, setErrorMassage] = useState('');
    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm])

    const fetchDataMovie = async (query = '') =>
    {
        setIsLoading(true)
        setErrorMassage('')
        try {
            const END_POINT = query ? `${BASE_URL}/search/movie?query=${encodeURI(query)}` : `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
            const response = await fetch(END_POINT, API_OPTIONS)
            if (!response.ok) {
                throw new Error('Failed to fetch data from the server')
            }
            const data = await response.json()


            if (data.response === 'false') {
                setErrorMassage(data.error || ' No movies found')
                setMoviesList([])
            }

            setMoviesList(data.results || [])
            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0])

            }
            setIsLoading(false)


        } catch (error) {
            console.error('Error fetching data:', error)
            setErrorMassage('An error occurred while fetching data Movie. Please try again later.')
        } finally {
            setIsLoading(false)
        }

    }
    const fetchTrendingMovies = async () => {
        try {
            const trendingMovies = await showTrendingMovies();
            setTrendingMovies(trendingMovies);
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            // setErrorMassage('An error occurred while fetching trending movies. Please try again later.');
        }
    }
    useEffect(() =>
    {
        fetchDataMovie(debouncedSearchTerm)
    }, [debouncedSearchTerm])
    useEffect(() =>
    {
        fetchTrendingMovies();
    }, [])
    return (
        < div className='pattern'>
            <div className='wrapper'>
                <header>
                    <img src="./hero-img.png" alt="hero-img" />
                    <h1>Find<span className='text-gradient '> Movie</span> you&quot;ll enjoy Without The Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>
                <section className='all-movies'>
                    {isLoading ? (
                        <Loader />
                    ) : errorMassage ? (
                        <p className='text-center text-2xl font-bold text-rose-100'>{errorMassage}</p>
                    ) : (
                        <MovieList moviesList={moviesList} trendingMovies={trendingMovies} />
                    )}
                </section>
            </div>

        </div>
    )
}

export default App
