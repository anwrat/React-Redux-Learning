import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import { MovieSchema } from "../schemas/movieSchema"
import type { RootState } from "../app/store"
import { setFieldValues } from "../services/defaultFormSlice"
import { addMovie, removeMovie } from "../services/customMovieSlice"

type FormData = z.infer<typeof MovieSchema>

export default function AddMovie(){
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState)=>state.customMovie.movies);
    const defaultFields = useSelector((state: RootState)=> state.defaultForm);
    const {register, handleSubmit,control, formState: {errors}} = useForm<FormData>({
        mode:"onChange",
        resolver: zodResolver(MovieSchema),
        defaultValues:{
            Title: defaultFields.Title,
            Year: defaultFields.Year,
            Type: defaultFields.Type as any,
            Poster: defaultFields.Poster,
        }
    });

    const formValues = useWatch({control});

    useEffect(()=>{
        if(formValues.Title || formValues.Year){
            dispatch(setFieldValues(formValues));
        }
    },[formValues, dispatch])

    const submitForm = (data: FormData) =>{
        const newMovie = {...data, imdbID: crypto.randomUUID()};
        dispatch(addMovie(newMovie));
    }

    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <div className = "max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Add Movie</h1>
                    <Link
                    to="/"
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                    Back
                    </Link>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                    <div>
                        <input className="w-full p-3 border rounded-lg" placeholder="Title" {...register('Title')}/>
                        {errors.Title && (
                            <p className="text-red-500 text-sm">{errors.Title.message}</p>
                        )}
                    </div>
                    <div>
                        <input className="w-full p-3 border rounded-lg" placeholder="Year" {...register('Year')}/>
                        {errors.Year && (
                            <p className="text-red-500 text-sm">{errors.Year.message}</p>
                        )}
                    </div>
                    <select className="p-3 border rounded-lg mb-4" {...register('Type')}>
                        <option value = "">Select Type</option>
                        <option value = "movie">Movie</option>
                        <option value = "series">Series</option>
                        <option value = "episode">Episode</option>
                    </select>
                    {errors.Type && (
                        <p className="text-red-500 text-sm">{errors.Type.message}</p>
                    )}
                    <div>
                        <input className="w-full p-3 border rounded-lg" placeholder="Poster" {...register('Poster')}/>
                        {errors.Poster && (
                            <p className="text-red-500 text-sm">{errors.Poster.message}</p>
                        )}
                    </div>
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        Submit
                    </button>
                </form>
            {movies.length === 0 &&(
                <p className="text-center text-gray-500">
                    No Custom Movies yet
                </p>
            )}
            <div className="max-w-2xl space-y-3">
                {movies.map((movie) => (
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
                        dispatch(removeMovie(movie.imdbID))
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