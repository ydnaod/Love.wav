require('dotenv').config();

let userToken;
const clientId = process.env.clientId;
const redirectUri = "http://localhost:3000/";

export const Spotify = {
    async getAccessToken() {
        if (userToken) {
            return userToken;
        }

        const accessToken = window.location.href.match(/access_token=([^&]*)/);
        const refreshToken = window.location.href.match(/refresh_token=([^&]*)/);

        if (accessToken) {
            userToken = accessToken[1];
            return userToken
        }
        else {
            const response = await fetch('http://localhost:4000/login', {
                method: 'GET'
            });
            console.log(response);
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                console.log(jsonResponse.tracks);
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    preview_url: track.preview_url
                }))
            })
    },

    async loadTrack(trackId) {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const parseRes = await response.json();
            if (!parseRes.tracks) {
                return [];
            }
            return parseRes.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview_url: track.preview_url
            }))

        } catch (error) {
            console.error(error.message)
        }


    },
    async loadPlaylist(playlistId) {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const parseRes = await response.json();
            if (!parseRes.tracks) {
                return [];
            }
            return parseRes.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview_url: track.preview_url
            }))

        } catch (error) {
            console.error(error.message)
        }
    },
    
    async loadUserPlaylist(userId) {
        try {
            const accessToken = Spotify.getAccessToken();
            console.log(accessToken)
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                json: true
            });
            const parseRes = await response.json();
            console.log(parseRes);
            if (!parseRes.playlists) {
                return [];
            }
            return parseRes.playlists.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview_url: track.preview_url
            }))

        } catch (error) {
            console.error(error.message)
        }
    },
    savePlaylist(playlistName, uriArray) {
        if (!playlistName || !uriArray) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: playlistName })
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: uriArray })
                    })
                })
        })
    },
};

