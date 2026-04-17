import { useEffect, useState } from 'react'
import { useSearchMoviesQuery, useGetMovieDetailsQuery } from '../services/omdbApi'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm, setTypeTerm } from '../services/filterSlice'
import { addFavourite } from '../services/favouritesSlice'
import type{ RootState } from '../app/store'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Movie Finder</h1>
        <Link
            to="/favourites"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
            Favourites
        </Link>
        </div>

        {/* Search Input */}
        <input
        value={searchTerm}
        type="text"
        placeholder="Search movies..."
        className="w-full p-3 border rounded-lg mb-4"
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />

        {/* Filter */}
        <select
        value={typeTerm}
        className="w-full p-3 border rounded-lg mb-4"
        onChange={(e) => dispatch(setTypeTerm(e.target.value))}
        >
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
        </select>

        {/* Results */}
        {isLoading && <p className="text-center">Loading...</p>}

        <div className="space-y-2">
        {debouncedQuery.length >= 3 &&
            filteredData?.map((movie: any) => (
            <div
                key={movie.imdbID}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                onClick={() => setId(movie.imdbID)}
            >
                {movie.Title}
                <Heart/>
            </div>
            ))}
        </div>
        
        {isMovieDetailsLoading && <p className='text-center'>Loading details...</p>}

        {/* Details */}
        {movieDetails && (
        <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">{movieDetails.Title}</h2>
            <p className="text-gray-600">{movieDetails.Year}</p>
            <p className="my-2">{movieDetails.Plot}</p>
            <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="w-40 rounded-lg"
            />
        </div>
        )}
    </div>
    </div>
  )
}