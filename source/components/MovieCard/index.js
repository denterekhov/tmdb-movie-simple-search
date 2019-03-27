// Core
import React, { Component } from 'react';
import { array, number, string } from 'prop-types';

// Instruments
import { IMAGE_URL } from '../../REST';
import Styles from './styles.m.css';

export default class MovieCard extends Component {
    static propTypes = {
        budget:        number.isRequired,
        genresNames:   array.isRequired,
        originalTitle: string.isRequired,
        overview:      string.isRequired,
        releaseDate:   string.isRequired,
        revenue:       number.isRequired,
        status:        string.isRequired,
        tagline:       string.isRequired,
        title:         string.isRequired,
        voteAverage:   number.isRequired,
    };

    render () {
        const {
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
            screenSize,
        } = this.props;

        return (
            <div className = { Styles.movie }>
                <div className = { Styles.movie__poster }>
                    <img
                        src = { posterPath
                            ? `${IMAGE_URL}/${screenSize}${posterPath}`
                            : 'http://www.bonvital.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/ImageNotFound_3.png' }
                    />
                </div>
                <div className = { Styles.movie__info }>
                    <h1>{title.toUpperCase()}</h1>
                    {title === originalTitle
                        ? null
                        : <h2>{originalTitle}</h2>
                    }
                    <p className = { Styles.movie__tag }>{tagline}</p>
                    <p className = { Styles.movie__desc }>{overview}</p>
                    {genresNames.length
                        ? <div>Genres: <span>{genresNames.join(', ')}</span></div>
                        : null
                    }
                    {homepage &&
                        <div>Homepage: <a href = { `${homepage}` }>{homepage}</a></div>
                    }
                    <div className = { Styles.movie__additional_info }>
                        <div className = { Styles.movie__meta }>
                            Status:
                            <div>{status}</div>
                        </div>
                        <div className = { Styles.movie__meta }>
                            Released:
                            {releaseDate ? <div>{releaseDate}</div> : <div>&mdash;</div>}
                        </div>
                        <div className = { Styles.movie__meta }>
                            Budget:
                            {budget ? <div>${budget.toLocaleString('en-US')}</div> : <div>&mdash;</div>}
                        </div>
                        <div className = { Styles.movie__meta }>
                            Box Office:
                            {revenue ? <div>${revenue.toLocaleString('en-US')}</div> : <div>&mdash;</div>}
                        </div>
                        <div className = { Styles.movie__meta }>
                            Duration:
                            {runtime ? <div>{runtime} mins</div> : <div>&mdash;</div>}
                        </div>
                        <div className = { Styles.movie__meta }>
                            Rating:
                            {voteAverage ?<div>{voteAverage} / 10</div> : <div>&mdash;</div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
