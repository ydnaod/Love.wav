import React, {useState, Fragment} from 'react';
import './TrackList.css';
import {LyricTrack} from '../LyricTrack/LyricTrack';

export function TrackList({tracks}){
    return(
        <Fragment>
            {
                tracks.map(track => {
                    return <LyricTrack track={track}
                        key={track.track.track_id}
                        artist_name={track.track.artist_name}
                        album_name={track.track.album_name}
                        track_name={track.track.track_name}
                        has_lyrics={track.track.has_lyrics}/>
                })
            }
        </Fragment>
    )
}