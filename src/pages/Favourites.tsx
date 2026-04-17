import { useSelector, useDispatch } from 'react-redux'
import type{ RootState } from '../app/store'
import { removeFavourite } from '../services/favouritesSlice'
import { Link } from 'react-router-dom'

export default function Favourites() {
  const favourites = useSelector(
    (state: RootState) => state.favourites.movies
  )

  const dispatch = useDispatch()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Favourites</h1>
          <Link
            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Back
          </Link>
        </div>

        {/* Empty state */}
        {favourites.length === 0 && (
          <p className="text-center text-gray-500">
            No favourites yet
          </p>
        )}

        {/* List */}
        <div className="space-y-3">
          {favourites.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              <div>
                <p className="font-semibold">{movie.Title}</p>
                <p className="text-sm text-gray-500">{movie.Year}</p>
              </div>

              <button
                onClick={() =>
                  dispatch(removeFavourite(movie.imdbID))
                }
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}