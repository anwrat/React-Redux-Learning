import { useEffect, useState } from 'react'
import { useSearchMoviesQuery, useGetMovieDetailsQuery } from './services/omdbApi'

export default function Search() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [id, setId] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const { filteredData, isLoading } = useSearchMoviesQuery(debouncedQuery, {
    skip: debouncedQuery.length < 3,
    selectFromResult: ({data, isLoading}) =>{
      const filteredData = data?.Search?.filter((movie: any) => {
        const matchesType = typeFilter ? movie.Type === typeFilter : true;
        return matchesType;
      });
      return {
        filteredData,
        isLoading
      }
    },
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
      <p className='font-bold text-2xl'>Movie Finder</p>
      <input
        type="text"
        placeholder="Search movies..."
        onChange={(e) => setQuery(e.target.value)}
      />

      <select onChange={(e)=>setTypeFilter(e.target.value)}>
        <option value = "">All</option>
        <option value = "movie">Movies</option>
        <option value = "series">Series</option>
        <option value = "episodes">Episodes</option>
      </select>



      {isLoading && <p>Loading...</p>}

      {query.length >= 3 && filteredData?.map((movie: any) => (
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