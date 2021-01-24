import React, { useState, Fragment, useEffect } from 'react';
import './ProfilePicture.css';

export function ProfilePicture({ fetchUserId }) {

    const [photo, setPhoto] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const handleImportFromSpotify = async () => {
        try {
            const response = await fetch(`http://localhost:4000/login/profile-picture`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            console.log(parseRes)
            setPhoto(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchPhoto = async () => {
        try {
            const userId = await fetchUserId();
            const response = await fetch(`http://localhost:4000/profile/${userId}/photo`, {
                method: 'GET',
                headers: { token: sessionStorage.token }
            });
            const parseRes = await response.json();
            //console.log(parseRes);
            setPhoto(parseRes);
            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchPhoto();
        //console.log('this is happening')
    }, [photo])

    return (
        <Fragment>
            <div className="editProfilePicture editProfileSetting">
                <p>profile picture</p>
                {
                    isLoading ? <p>loading</p> : <img src={photo} className="profilePicture"></img>
                }
                <button onClick={handleImportFromSpotify}>import photo from Spotify</button>
            </div>
        </Fragment>
    )
}