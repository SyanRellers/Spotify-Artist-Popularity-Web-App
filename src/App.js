// import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
// import { Track } from 'react-spotify-api'
// import { Artist } from 'react-spotify-api'
// import { TrackAnalysis } from 'react-spotify-api'
/*import { TrackFeatures } from 'react-spotify-api'
import { Album } from 'react-spotify-api'
import { AlbumTracks } from 'react-spotify-api'
import { SpotifyApiContext } from 'react-spotify-api';*/


function App() {
  const CLIENT_ID = "c2885c6d092945b9a381f2aa70d25987"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  //const [tracks, setTracks] = useState([])

  const [token, setToken] = useState("")

  // https://www.geeksforgeeks.org/how-to-connect-mongodb-with-reactjs/
  const submitToDB = async (e) => {
    e.preventDefault();
    const {data} = await axios.get("https://api.spotify.com/v1/users/user_id", {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
    let result = await fetch(
    'http://localhost:5000/DBSubmit', {
        method: "post",
        body: JSON.stringify({data}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    result = await result.json();
    console.warn(result);
    if (result) {
        alert("Data saved succesfully");
    }
}

  // Login to spotify with redirect
  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  // Logout
  const logout = () => {
      submitToDB()
      setToken("")
      window.localStorage.removeItem("token")
  }

  // grabs your top 50 tracks
  /*
  const getTopTracks = async () => {

    const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=50", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
        type: "track"
    }
    })

    setTracks(data.tracks)
  }*/

  /*
  const renderTracks = () => {
    return tracks.map(track => (
        <div key={track.id}>
            {track.album.images ? <img width={"100%"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
            {track.name}
        </div>
    ))
  }*/


  /*
  const renderTracks = () => {
    return (
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <div>
              {track.album.images ? (
                <img src={track.album.images[0].url} alt="Album cover" />
              ) : (
                <div>No Image</div>
              )}
            </div>
            <div>{track.name}</div>
            <div>{track.artists[0].name}</div>
          </li>
        ))}
      </ul>
    );
  };*/

  /*
  const renderTracks = () => {
    return (
      <Track id={["4kmBkq3ONzENSIRv2ah8Gh","58LDBCFIHWmFnRGJQPTXvb"]}>
          {(tracks, loading, error) => (
              tracks ? (
                  tracks.map(track => (
                      <h1 key={track.id}>{track.name}</h1>
                  ))
              ) : null
          )}
      </Track>
    );
  };*/





  // Allows us to search for artists in the web application
  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })
    
    setArtists(data.artists.items)
}

  // renders the Artist Image and data
  const renderArtists = () => {
    return artists.map(artist => (
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
            <div>
              {"\nFollowers: " + artist.followers.total} 
            </div>
            <div>
              {" Popularity Index (0-100): " + artist.popularity}
            </div>
            
            <div>
              {"Genre: " + artist.genres[0]}    
            </div>
            
        </div>
    ))
  }

  /*
  const getTopTracks = async (event) => {
    event.preventDefault()
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=50",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: "track",
        },
      }
    );
  
    console.log(data.tracks); // Check if data is being retrieved successfully
    setTracks(data.tracks);
    console.log(tracks); // Check if state is being set properly
  };*/

  /*
  useEffect(() => {
    getTopTracks();
  }, []);*/

  return (
      <div className="App">
          <header className="App-header">
              <h1>Spotify Artist Popularity Lookup</h1>
              <p>Type in an artist name below to see their popularity index and follower count!</p>
              {!token ?
                  // Spotify Access Link
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                      to Spotify</a>
                    
                  : <button onClick={logout}>Logout</button>}
              
                  
              <form onSubmit={searchArtists}>
                  <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                  <button type={"submit"}>Search</button>
              </form>

              {renderArtists()}
              

          </header>      
      </div>
  );
}

export default App;
