import React, {useState, Fragment} from 'react';
import './TrackList.css';
import {LyricTrack} from '../LyricTrack/LyricTrack';

export function TrackList({tracks, handleTrackClick}){
    return(
        <Fragment>
            {
                tracks.map(track => {
                    return <LyricTrack track={track}
                        key={track.id}
                        artist={track.artist.name}
                        album={track.album.title}
                        title={track.title}
                        handleTrackClick={handleTrackClick}/>
                })
            }
        </Fragment>
    )
}