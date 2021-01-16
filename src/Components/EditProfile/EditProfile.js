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

export function EditProfile({fetchUserId}) {

    return (
        <Router>
            <Fragment>
                <nav id="nav" className='editProfileNav'>
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
                </nav>
                <Switch>
                    <Route exact path='/profilePicture'>
                        <ProfilePicture />
                    </Route>
                    <Route exact path='/yourPlaylist'>
                        <YourPlaylist fetchUserId={fetchUserId}/>
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