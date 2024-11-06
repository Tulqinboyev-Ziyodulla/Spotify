import React, { useContext, useEffect, useState } from 'react';
import { CLIENT_ID } from '../hook/useEnv';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import SpotifyWebApi from 'spotify-web-api-node';

function MusicLists({ artistName }) {
  const { token, setPlay, setPlaying } = useContext(Context);
  const [tracksList, setTracksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
  });

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token);
  }, [token]);

  useEffect(() => {
    if (token && artistName) {
      setLoading(true);
      setError(null);
      spotifyApi.searchTracks(artistName)
        .then(res => {
          const tracks = res.body.tracks.items.map(item => ({
            id: item.id,
            img: item.album.images[0].url,
            trackName: item.name,
            artistName: item.album.artists[0].name,
            uri: item.uri
          }));
          setTracksList(tracks);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Spotify API search error:", error);
          setError("Tracklarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
          setLoading(false);
        });
    }
  }, [token, artistName]);

  function handlePlay(item) {
    if (setPlay) {
      setPlay(item.uri);
      setPlaying(true);
      navigate(`/music/${item.id}`);
    } else {
      console.error("setPlay is not a function");
    }
  }

  return (
    <div>
      <h2 className='mb-[26px] font-bold text-[30px] text-white'>{artistName}</h2>
      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : tracksList.length > 0 ? (
        <div className='flex justify-between gap-5 overflow-x-auto overflow-y-hidden'>
          {tracksList.map(item => (
            <div onClick={() => handlePlay(item)} key={item.id} className="min-w-[225px] h-[320px] cursor-pointer p-[21px] rounded-[8px] bg-[#1B1B1B]">
              <img className='h-[182px] mb-[25px] rounded-[8px]' src={item.img} alt="Tracks img" width={"100%"} />
              <h2 className='text-white font-bold text-[20px] mb-2'>{item.trackName}</h2>
              <p className='font-normal text-[18px] text-white opacity-60'>{item.artistName}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white">No tracks found.</div>
      )}
    </div>
  );
}

export default MusicLists;
