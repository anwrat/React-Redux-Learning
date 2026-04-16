import { useEffect, useState } from 'react'
import { useSearchMoviesQuery, useGetMovieDetailsQuery } from './services/omdbApi'

export default function Search() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [id, setId] = useState('');

  const { data, isLoading } = useSearchMoviesQuery(debouncedQuery, {
    skip: debouncedQuery.length < 3,
  })

  const { data: movieDetails, isLoading: isMovieDetailsLoading } = useGetMovieDetailsQuery(id, {
    skip: !id,
  })


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => clearTimeout(timer)
  },[query])

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {isLoading && <p>Loading...</p>}

      {query.length >= 3 && data?.Search?.map((movie: any) => (
        <div key={movie.imdbID}>
          <p onClick = {() => setId(movie.imdbID)}>{movie.Title}</p>
        </div>
      ))}

      {isMovieDetailsLoading && <p>Loading movie details</p>}

      {movieDetails && (
        <div>
          <h2>{movieDetails.Title}</h2>
          <p>{movieDetails.Year}</p>
          <p>{movieDetails.Plot}</p>
          <img src={movieDetails.Poster} alt={movieDetails.Title} />
        </div>
      )}
    </div>
  )
}