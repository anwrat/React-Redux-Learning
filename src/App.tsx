import { useEffect, useState } from 'react'
import { useSearchMoviesQuery, useGetMovieDetailsQuery } from './services/omdbApi'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm, setTypeTerm } from './services/filterSlice'
import type{ RootState } from './app/store'

export default function Search() {
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [id, setId] = useState('');

  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.searchFilter.searchTerm);
  const typeTerm = useSelector((state: RootState) => state.searchFilter.typeTerm);

  const { filteredData, isLoading } = useSearchMoviesQuery(debouncedQuery, {
    skip: debouncedQuery.length < 3,
    selectFromResult: ({data, isLoading}) =>{
      const filteredData = data?.Search?.filter((movie: any) => {
        const matchesType = typeTerm ? movie.Type === typeTerm : true;
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
      setDebouncedQuery(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  },[searchTerm])

  return (
    <div>
      <p className='font-bold text-2xl'>Movie Finder</p>
      <input
        value={searchTerm}
        type="text"
        placeholder="Search movies..."
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />

      <select value={typeTerm} onChange={(e)=>dispatch(setTypeTerm(e.target.value))}>
        <option value = "">All</option>
        <option value = "movie">Movies</option>
        <option value = "series">Series</option>
        <option value = "episode">Episodes</option>
      </select>



      {isLoading && <p>Loading...</p>}

      {debouncedQuery.length >= 3 && filteredData?.map((movie: any) => (
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