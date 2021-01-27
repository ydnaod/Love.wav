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

    const selectedColor = 'rgb(255, 175, 146)';
    const selected = {
        backgroundColor: isSelected ? selectedColor : 'white',
    }

    const defaultStyle = {

    }

    return (
        <Fragment>
            <div style={isSelected ? selected : defaultStyle}>
                <p onClick={handleClick}>{line}</p>
            </div>
        </Fragment>
    )
}