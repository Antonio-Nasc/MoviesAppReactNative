/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getMovieByIdUseCase } from '../../core/use-cases/movie/get-by-id.use-case';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { FullMovie } from '../../core/entities/movie.entity';
import { Cast } from '../../core/entities/cast.entity';
import { getMovieCastUseCase } from '../../core/use-cases/movie/get-cast.use-case';

export const useMovie = (movieId: number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState<FullMovie>();
    const [casts, setCasts] = useState<Cast[]>();



    useEffect(() => {
        loadMovie()
    }, [movieId])

    const loadMovie = async () => {
        setIsLoading(true)

        const fullMoviePromise = await getMovieByIdUseCase(movieDBFetcher, movieId)
        const castPromise = await getMovieCastUseCase(movieDBFetcher, movieId)

        const [fullMovie, cast] = await Promise.all([fullMoviePromise, castPromise])
        setMovie(fullMovie)
        setCasts(cast)

        setIsLoading(false)
    }
    return {
        isLoading,
        movie,
        casts
    }
}
