import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({moviesList, trendingMovies}) => {
  return (
    <>
    {trendingMovies.length > 0 && (
        <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
                {trendingMovies.map((movie, index) => (
                    <li key={movie.id}>
                        <p>{index + 1}</p>
                        <img src={movie.poster_url} alt={movie.title} />
                    </li>
                ))}

            </ul>
        </section>
    )}
        <h1>Movie List</h1>
        <ul>
        {moviesList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />

        ))}
        </ul>

    </>
  )
}


export default MovieList
