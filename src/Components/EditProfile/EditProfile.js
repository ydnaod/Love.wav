import React, { Fragment, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import './EditProfile.css';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { YourPlaylist } from '../YourPlaylist/YourPlaylist';
import { YourThemeSong } from '../YourThemeSong/YourThemeSong';
import { FavoriteLyric } from '../FavoriteLyric/FavoriteLyric';

export function EditProfile() {

    const [playlists, setPlaylists] = useState();

    const fetchPlaylists = async () => {
        const response = await fetch('http://localhost:4000/login/loadPlaylists', {
            method: 'GET',
            headers: { token: sessionStorage.token }
        })
        const parseRes = await response.json();
        console.log(parseRes);
        const playlists = parseRes.items.map(playlist => ({
            id: playlist.id,
            owner: playlist.owner.display_name,
            name: playlist.name
        }))
        setPlaylists(playlists);
    }

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <Router>
            <Fragment>
                <li>
                    <Link to='/profilePicture'>profile picture</Link>
                </li>
                <li>
                    <Link to='/yourPlaylist'>your playlist</Link>
                </li>
                <li>
                    <Link to='/yourThemeSong'>your theme song</Link>
                </li>
                <li>
                    <Link to='/favoriteLyric' >your favorite lyric</Link>
                </li>
                <Switch>
                    <Route exact path='/profilePicture'>
                        <ProfilePicture />
                    </Route>
                    <Route exact path='/yourPlaylist'>
                        <YourPlaylist />
                    </Route>
                    <Route exact path='/yourThemeSong'>
                        <YourThemeSong />
                    </Route>
                    <Route exact path='/favoriteLyric'>
                        <FavoriteLyric />
                    </Route>
                </Switch>
            </Fragment>
        </Router>
    )
}