import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import { MovieSchema } from "../schemas/movieSchema"

type FormData = z.infer<typeof MovieSchema>

export default function AddMovie(){
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(MovieSchema)
    });

    const submitForm = (data: FormData) =>{
        const newMovie = {...data, imdbID: crypto.randomUUID()}
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
                    <div>
                        <input className="w-full p-3 border rounded-lg" placeholder="Poster" {...register('Poster')}/>
                        {errors.Poster && (
                            <p className="text-red-500 text-sm">{errors.Poster.message}</p>
                        )}
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Submit</button>
                </form>
            </div>
        </div>
    )
}