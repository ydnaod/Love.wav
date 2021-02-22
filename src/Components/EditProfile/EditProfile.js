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
import { Transition, animated, Spring } from 'react-spring/renderprops'

export function EditProfile({ fetchUserId }) {

    return (
        <Router>
            <Fragment>
                <div className='editProfile glass'>
                    <nav id="nav" className='editProfileNav glass'>
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
                            {/* <Spring
                                from={{ opacity: 0 }}
                                to={{ opacity: 1 }}>
                                {props => <ProfilePicture style={props} fetchUserId={fetchUserId} notify={notify} />}
                            </Spring> */}
                            <ProfilePicture fetchUserId={fetchUserId}/>
                        </Route>
                        <Route exact path='/yourPlaylist'>
                            <YourPlaylist fetchUserId={fetchUserId} />
                        </Route>
                        <Route exact path='/yourThemeSong'>
                            <YourThemeSong fetchUserId={fetchUserId} />
                        </Route>
                        <Route exact path='/favoriteLyric'>
                            <FavoriteLyric fetchUserId={fetchUserId} />
                        </Route>
                    </Switch>
                </div>
            </Fragment>
        </Router>
    )
}