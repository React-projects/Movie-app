import React from 'react'

const MovieList = ({moviesList}) => {
  return (
    <ul>
        <h1>Movie List</h1>
        {moviesList.map((movie) => (
            <p className='text-white' key={movie.id}>{movie.title}</p>


        ))}
    </ul>
  )
}


export default MovieList
