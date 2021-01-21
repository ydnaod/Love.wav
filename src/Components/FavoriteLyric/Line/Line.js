import React, { useState, Fragment } from 'react';
import './Line.css';

export function Line({ line, index, handleLineSelect, handleFavoriteLyricSelect }) {

    const handleClick = () => {
        if (handleLineSelect) {
            handleLineSelect(index);
        }
        if (handleFavoriteLyricSelect) {
            handleFavoriteLyricSelect(index);
        }
    }

    return (
        <Fragment>
            <p onClick={handleClick}>{line}</p>
        </Fragment>
    )
}