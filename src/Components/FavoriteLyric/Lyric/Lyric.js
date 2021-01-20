import React, { useState, Fragment } from 'react';
import './Lyric.css';
import {Line} from '../Line/Line'

export function Lyric({ lyrics }) {
    return (
        <Fragment>
            <div>
                {
                    lyrics.map(line => {
                        return <Line line={line}
                            index={lyrics.indexOf(line)}
                            key={lyrics.indexOf(line)}/>
                    })
                }
            </div>
        </Fragment>
    )
}