import React, { useState, Fragment } from 'react';
import './Lyric.css';
import { Line } from '../Line/Line'

export function Lyric({ lyrics, handleLineSelect, handleFavoriteLyricSelect, selectedLines, favoriteLyric, lyricsSubmitted, favorite, slideGuess, selectedLine }) {

    if (favorite) {
        return (
            <div>
                {
                    lyrics.map((line, index) => {
                        return <Line line={line}
                            index={index}
                            key={index}
                            isSelected={favorite == index ? true : false}/>
                    })
                }
            </div>
        )
    }
    else if (favoriteLyric || favoriteLyric == 0) {
        return (
            <div>
                {
                    lyrics.map((line, index) => {
                        return <Line line={line}
                            index={index}
                            key={index}
                            isSelected={favoriteLyric === index ? true : false}
                            handleFavoriteLyricSelect={handleFavoriteLyricSelect}/>
                    })
                }
            </div>
        )
    }
    else if (lyricsSubmitted) {
        return (
            <div>
                {
                    lyrics.map((line, index) => {
                        return <Line line={line}
                            index={index}
                            key={index}
                            handleFavoriteLyricSelect={handleFavoriteLyricSelect}/>
                    })
                }
            </div>
        )
    }
    else if (selectedLines) {
        return (
            <div>
                {
                    lyrics.map((line, index) => {
                        return <Line line={line}
                            index={index}
                            key={index}
                            handleLineSelect={handleLineSelect}
                            isSelected={selectedLines[index] === line ? true : false} />
                    })
                }
            </div>
        )
    }
    else if(slideGuess){
        return (
            <div>
                {
                    lyrics.map((line, index) => {
                        return <Line line={line}
                            index={index}
                            key={index}
                            handleLineSelect={handleLineSelect}
                            isSelected={lyrics[selectedLine] === line ? true : false} />
                    })
                }
            </div>
        )
    }
    else{
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
}