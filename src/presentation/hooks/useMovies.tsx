/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movie.entity"
import { moviesNowPlayingUseCase } from "../../core/use-cases/movies/now-playing.use-case";
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter";
import { moviesUpcomingUseCase } from "../../core/use-cases/movies/upcoming.use-case";
import { moviesTopRatedUseCase } from "../../core/use-cases/movies/top-rated.use-case";
import { moviesPopularUseCase } from "../../core/use-cases/movies/popular.use-case";
export const useMovies = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [NowPlaying, setNowPlaying] = useState<Movie[]>([])
    const [popular, setPopular] = useState<Movie[]>([])
    const [topRated, setTopRated] = useState<Movie[]>([])
    const [upcoming, setUpcoming] = useState<Movie[]>([])


    useEffect(() => {
        initialLoad()
    }, [])

    const initialLoad = async () => {
        const nowPlayingPromise = moviesNowPlayingUseCase(movieDBFetcher)
        const popularPromise = moviesPopularUseCase(movieDBFetcher)
        const topRatedPromise = moviesTopRatedUseCase(movieDBFetcher)
        const upcomingPromise = moviesUpcomingUseCase(movieDBFetcher)

        const [nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ])
        setNowPlaying(nowPlayingMovies)
        setPopular(popularMovies)
        setTopRated(topRatedMovies)
        setUpcoming(upcomingMovies)

        setIsLoading(false)
    }

    return {
        isLoading,
        NowPlaying,
        popular,
        topRated,
        upcoming
    }
}