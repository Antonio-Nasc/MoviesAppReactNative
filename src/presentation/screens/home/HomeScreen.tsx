/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { useMovies } from '../../hooks/useMovies'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PosterCarousel } from '../../components/movies/PosterCarousel'
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel'
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader'

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets()
    const { isLoading, NowPlaying, popular, topRated, upcoming, popularNextPage } = useMovies()

    if (isLoading) {
        return <FullScreenLoader/>
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20, paddingBottom: 30 }}>
                <PosterCarousel
                    movies={NowPlaying}
                />
                <HorizontalCarousel
                    movies={popular} title='Populares' loadNextPage={popularNextPage} />

                <HorizontalCarousel
                    movies={topRated} title='Melhores classificados' />

                <HorizontalCarousel
                    movies={upcoming} title='Próximos' />

            </View>
        </ScrollView>
    )
}
