import React, { useState, Fragment } from 'react';
import './Line.css';

export function Line({ line, index, handleLineSelect, handleFavoriteLyricSelect, isSelected, selectedLines }) {

    const handleClick = () => {
        if (handleLineSelect) {
            handleLineSelect(index);
        }
        if (handleFavoriteLyricSelect) {
            handleFavoriteLyricSelect(index);
        }
    }

    //orange
    //const selectedColor = 'rgb(235,182,23)';

    //pink
    const selectedColor = 'rgb(255, 23, 120, .75)';

    const selected = {
        backgroundColor: selectedColor,
        color: 'rgb(255,255,255)'
    }

    const defaultStyle = {

    }

    return (
        <Fragment>
            <div className="selectedLines"style={isSelected ? selected : defaultStyle}>
                <p onClick={handleClick}>{line}</p>
            </div>
        </Fragment>
    )
}