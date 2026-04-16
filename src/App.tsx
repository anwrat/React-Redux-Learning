import { useEffect, useState } from 'react'
import { useSearchMoviesQuery } from './services/omdbApi'

export default function Search() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [id, setId] = useState('');

  const { data, isLoading } = useSearchMoviesQuery(debouncedQuery, {
    skip: debouncedQuery.length < 3,
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
    </div>
  )
}