import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div className='search-container'>
        <img src="./search.png" alt="search icon" />
      <input
        type="text"
        placeholder='Search for movies'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}

        aria-label='Search for movies'
      />
        </div>

    </div>
  )
}

export default Search
