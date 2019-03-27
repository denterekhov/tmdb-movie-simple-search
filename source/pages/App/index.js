// Core
import React, { Component } from 'react';

// Components
import { Header, MovieCard, Spinner } from '../../components';

// Instruments
import { BASE_URL, API_KEY, IMAGE_URL } from '../../REST';
import Styles from './styles.m.css';

export default class App extends Component {
    state = {
        movie:      {},
        screenSize: '',
        isFetching: false,
    }

    componentDidMount = () => {
        this._fetchChosenMovieAsync(27205);
    }

    _setIsFetching = (isFetching) => {
        this.setState({
            isFetching,
        });
    }

    _fetchChosenMovieAsync = async (id) => {
        try {
            this._setIsFetching(true);
            const response = await fetch(`${BASE_URL}/movie/${id}?${API_KEY}`);

            if (response.status === 200) {
                const {
                    backdrop_path: backdropPath,
                    budget,
                    genres,
                    homepage,
                    original_title: originalTitle,
                    overview,
                    poster_path: posterPath,
                    release_date: releaseDate,
                    revenue,
                    runtime,
                    status,
                    tagline,
                    title,
                    vote_average: voteAverage,
                } = await response.json();

                const genresNames = genres.map((genre) => genre.name);

                const screenSize = window.innerWidth <= 768 ? 'w500' : 'original';

                const posterImage = new Image();

                posterImage.onload = () => {
                    this._setIsFetching(false);
                };
                posterImage.src = posterPath
                    ? `${IMAGE_URL}/${screenSize}${posterPath}`
                    : 'http://www.bonvital.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/ImageNotFound_3.png';

                const backgroundImagePath = backdropPath
                    ? `url(${IMAGE_URL}/${screenSize}${backdropPath})`
                    : 'url(https://www.verdict.co.uk/wp-content/uploads/2017/10/shutterstock_384996514.jpg)';

                this.setState({
                    movie: {
                        backgroundImagePath,
                        budget,
                        genresNames,
                        homepage,
                        originalTitle,
                        overview,
                        posterPath,
                        releaseDate,
                        revenue,
                        runtime,
                        status,
                        tagline,
                        title,
                        voteAverage,
                    },
                    screenSize,
                });
            }
        } catch (error) {
            console.error('error: ', error);
        }
    }

    render () {
        const { movie: { backgroundImagePath, title }, screenSize, isFetching } = this.state;

        return (
            <>
                {title && (
                    <div className = { Styles.app } style = { { backgroundImage: backgroundImagePath } }>
                        <Spinner isFetching = { isFetching } />
                        <div className = { Styles.app__overlay }>
                            <Header
                                fetchChosenMovieAsync = { this._fetchChosenMovieAsync }
                            />
                            <MovieCard
                                { ...this.state.movie }
                                screenSize = { screenSize }
                            />
                        </div>
                    </div>
                )}
            </>
        );
    }
}
