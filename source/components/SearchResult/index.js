// Core
import React, { Component } from 'react';
import { func, number, string } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export default class SearchResult extends Component {

    static propTypes = {
        handleChooseMovie: func.isRequired,
        id:                number.isRequired,
        originalTitle:     string.isRequired,
        title:             string.isRequired,
        voteAverage:       number.isRequired,
    };

    _handleClick = () => {
        const { handleChooseMovie, id, title } = this.props;

        handleChooseMovie(id, title);
    };

    render () {
        const { id, originalTitle, title, voteAverage } = this.props;

        return (
            <div
                className = { Styles.search }
                id = { id }
                key = { id }
                onClick = { this._handleClick }>
                <div
                    className = { Styles.search__titles }>
                    <span>{title} &nbsp;</span>
                    <span className = { Styles.search__original_title }>
                        {originalTitle}
                    </span>
                </div>
                <div className = { Styles.search__vote }>
                    {voteAverage ? voteAverage.toFixed(1) : <span>&mdash;</span>}
                </div>
            </div>
        );
    }
}
