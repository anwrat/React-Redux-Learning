import {z} from 'zod';

export const MovieSchema = z.object({
    Title: z.string().min(4, "Movie title must be at least 4 characters long"),
    Year: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number"),
    Type: z.enum(['movie', 'series', 'episode'], "Type must be either 'movie', 'series', or 'episode'"),
    Poster: z.string().regex(/^[^<>:"|?*]+$/, "Poster URL cannot contain invalid characters"),
});