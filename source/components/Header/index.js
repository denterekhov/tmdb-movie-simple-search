// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

// Instruments
import { SEARCH_URL } from '../../REST';
import Logo from '../../theme/assets/tmdb.svg';
import Styles from './styles.m.css';

// Components
import { SearchResult } from '../';

export default class Header extends Component {
    static propTypes = {
        fetchChosenMovieAsync: func.isRequired,
    };

    state = {
        inputValue: '',
        movies:     [],
    }

    _handleChange = (event) => {
        this.setState({
            inputValue: event.target.value,
        }, () => {
            const { inputValue } = this.state;

            if (inputValue.trim().length >= 2) {
                this._fetchMoviesAsync(inputValue);
            } else {
                this.setState({
                    movies: [],
                });
            }
        });
    }

    _handleChooseMovie = (id, title) => {
        const { fetchChosenMovieAsync } = this.props;

        this.setState({
            inputValue: title,
            movies:     [],
        });
        fetchChosenMovieAsync(id);
    }

    _handleMouseLeave = () => {
        this.setState({
            movies: [],
        });
    }

    _fetchMoviesAsync = async (query) => {

        try {
            const encodedQuery = encodeURI(query);
            const response = await fetch(`${SEARCH_URL}${encodedQuery}`);

            if (response.status === 200) {
                const { results: movies } = await response.json();

                this.setState({
                    movies,
                });
            }
        } catch (error) {
            console.error('error: ', error);
        }
    }

    render () {
        const { inputValue, movies } = this.state;
        const moviesJSX = movies.slice(0, 5).map((movie) => {
            const { id, title, original_title: originalTitle, vote_average: voteAverage } = movie;

            return (
                <SearchResult
                    handleChooseMovie = { this._handleChooseMovie }
                    id = { id }
                    key = { id }
                    originalTitle = { originalTitle }
                    title = { title }
                    voteAverage = { voteAverage }
                />
            );
        });

        return (
            <div className = { Styles.header }>
                <div className = { Styles.header__logo }>
                    <a href = 'https://www.themoviedb.org/'>
                        <img alt = 'The Movie DB' src = { Logo } />
                    </a>
                </div>
                <div
                    className = { Styles.header__search }
                    onMouseLeave = { this._handleMouseLeave }>
                    <input
                        placeholder = 'Search movie...'
                        type = 'text'
                        value = { inputValue }
                        onChange = { this._handleChange }
                    />
                    <div className = { Styles.search__results }>
                        {movies.length ? moviesJSX : null}
                    </div>
                </div>
            </div>
        );
    }
}
