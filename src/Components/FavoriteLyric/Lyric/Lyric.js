import React, { useState, Fragment } from 'react';
import './Lyric.css';
import {Line} from '../Line/Line'

export function Lyric({ lyrics, handleLineSelect,handleFavoriteLyricSelect }) {
    return (
        <Fragment>
            <div>
                {
                    lyrics.map((line, index) => {
                        return <Line line={line}
                            index={index}
                            key={index}
                            handleLineSelect={handleLineSelect}
                            handleFavoriteLyricSelect={handleFavoriteLyricSelect}/>
                    })
                }
            </div>
        </Fragment>
    )
}