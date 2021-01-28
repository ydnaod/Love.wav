import React, { useState, Fragment } from 'react';
import './Line.css';
const style = require('../../../Util/selectedStyling');

export function Line({ line, index, handleLineSelect, handleFavoriteLyricSelect, isSelected, selectedLines }) {

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
            <div className="selectedLines" style={isSelected ? style.selected : style.defaultStyle}>
                <p onClick={handleClick}>{line}</p>
            </div>
        </Fragment>
    )
}