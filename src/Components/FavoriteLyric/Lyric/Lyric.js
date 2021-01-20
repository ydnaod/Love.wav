import React, { useState, Fragment } from 'react';
import './Lyric.css';
import {Line} from '../Line/Line'

export function Lyric({ lyrics }) {
    return (
        <Fragment>
            <div>
                {
                    lyrics.map((line, index) => {
                        return <Line line={line}
                            index={index}
                            key={index}/>
                    })
                }
            </div>
        </Fragment>
    )
}