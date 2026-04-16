import { useState } from 'react'
import { useSearchMoviesQuery } from './services/omdbApi'

export default function Search() {
  const [query, setQuery] = useState('')

  const { data, isLoading } = useSearchMoviesQuery(query, {
    skip: query.length < 3,
  })

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
          <p>{movie.Title}</p>
        </div>
      ))}
    </div>
  )
}