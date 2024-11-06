import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { CLIENT_ID } from '../../hook/useEnv';
import { useParams } from 'react-router-dom';
import { PlayIcon, SaveTrack, LikedInner, TrackLike, MoreTarck } from '../../assets/icons';
import SpotifyWebApi from 'spotify-web-api-node';

function Single() {
  const { id } = useParams();
  const { token, setPlay, playing, setPlaying } = useContext(Context);

  const [trackInfo, setTrackInfo] = useState(null);
  const [artistList, setArtistList] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
  });

  useEffect(() => {
    if (token) {
      spotifyApi.setAccessToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      // Get track details
      spotifyApi.getTrack(id)
        .then(res => {
          const data = {
            artistName: res.body.artists[0].name,
            trackName: res.body.name,
            img: res.body.album.images[0].url,
            totalTrack: res.body.album.total_tracks,
            time: String(((res.body.duration_ms / 1000) / 60).toFixed(2)).split(".").join(":")
          };
          setTrackInfo(data);

          // Search for related tracks by the artist
          spotifyApi.searchTracks(res.body.artists[0]?.name)
            .then(res => {
              setArtistList(res.body.tracks.items.map(item => ({
                id: item.id,
                img: item.album.images[0].url,
                trackName: item.name,
                artistName: item.album.artists[0].name,
                albumName: item.album.name,
                time: String(((item.duration_ms / 1000) / 60).toFixed(2)).split(".").join(":"), // Track duration
                uri: item.uri,
                isLiked: false,
                isPlay: false
              })));
            });
        })
        .catch(error => console.error(error));
    }
  }, [token, id]);

  const handleTrackPlay = (item) => {
    if (currentTrack && currentTrack.id === item.id) {
      setPlay(false);  // Stop the current track
      setPlaying(false);
      setCurrentTrack(null);
    } else {
      setArtistList(prev => prev.map(track =>
        track.id === item.id ? { ...track, isPlay: true } : { ...track, isPlay: false }
      ));
      setPlay(item.uri);
      setPlaying(true);
      setCurrentTrack(item);  // Set the new current track
    }
  };

  if (!trackInfo) {
    return <div>Loading...</div>; // Add better loading state (spinner)
  }

  return (
    <div className='bg-yellow h-[100vh] overflow-y-auto p-5 pb-[100px]'>
      <div className="flex items-end mx-auto pt-[30px] gap-[32px] w-[95%] p-2">
        <img className='h-[297px] rounded-sm' src={trackInfo.img} alt="img" width={297} height={297} />
        <div className="text-white">
          <h3 className='font-medium text-[16px]'>PUBLIC PLAYLIST</h3>
          <h2 className='font-bold text-[65px]'>{trackInfo.trackName}</h2>
          <span className='font-medium text-[20px] mb-3 inline-block'>
            {trackInfo.artistName} <p className='text-[#C2C3B9] inline-block'>and more</p> 
          </span>
          <span className='font-medium text-[20px] block'> 
            <p className='text-[#C2C3B9] inline-block'>Made for</p> MOhirjon . {trackInfo.totalTrack} songs, {trackInfo.time} min 
          </span>
        </div>
      </div>

      <div className="mt-[60px] p-5">
        <div className="flex items-center gap-[25px]">
          <TrackLike className="cursor-pointer" />
          <SaveTrack className="cursor-pointer" />
          <MoreTarck className="cursor-pointer" />
        </div>
      </div>

      <table className='w-full mt-[30px]'>
        <thead>
          <tr className='border-b-[2px] border-[#666666]'>
            <th className='text-[#B3B3B3] text-5 py-4'>#</th>
            <th className='text-[#B3B3B3] text-start px-3 text-5 py-4'>TITLE</th>
            <th className='text-[#B3B3B3] text-start text-5 py-4'>ALBUM</th>
            <th className='text-[#B3B3B3] text-5 py-4'>TIME</th>
          </tr>
        </thead>
        <tbody>
          {artistList.map((item, index) => (
            <tr onClick={() => handleTrackPlay(item)} className='cursor-pointer' key={item.id}>
              <td className='text-[#B3B3B3] text-[18px]'>
                {item.isPlay ? <PlayIcon className="text-green-500" /> : index + 1}
              </td>
              <td className='p-3'>
                <div className="flex items-center space-x-[21px]">
                  <img className='rounded-md' src={item.img} alt="img" width={52} height={52} />
                  <div className="">
                    <h3 className={`text-[22px] font-semibold ${item.isPlay ? "text-green-500" : "text-white"}`}>{item.trackName}</h3>
                    <p className='text-[18px] text-[#B3B3B3]'>{item.artistName}</p>
                  </div>
                </div>
              </td>
              <td className='font-medium p-3 text-[20px] text-[#B3B3B3]'>{item.albumName}</td>
              <td className='font-medium p-3 text-[20px] space-x-[34px] flex items-center text-white text-end'>
                <button id='like' className={`${item.isLiked ? "text-green-500" : "text-white"}`}><LikedInner /></button>
                <p>{item.time}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Single;
