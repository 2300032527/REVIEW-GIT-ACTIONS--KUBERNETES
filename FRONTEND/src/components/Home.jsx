import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from './PlaylistCard';
import SongItem from './SongItem';
import SearchBar from './SearchBar';
import axios from 'axios';

const JAMENDO_CLIENT_ID = "68b75020"; // Only Client ID needed on frontend

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const playlists = [
    { title: 'RRR Hits', image: 'https://image.tmdb.org/t/p/original/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg' },
    { title: 'Pushpa Anthems', image: 'https://is4-ssl.mzstatic.com/image/thumb/Music116/v4/c4/c3/8f/c4c38f8d-b579-8ce7-ef86-04dbb847ea06/cover.jpg/1200x1200bf-60.jpg' },
    { title: 'Guntur Kaaram Vibes', image: 'https://tse2.mm.bing.net/th/id/OIP.gCYi3PFVmNhtGefBTxFoPwHaLH?pid=Api&P=0&h=220' },
    { title: 'Animal', image: 'https://static1.showtimes.com/poster/660x980/animal-174150.jpg' },
    { title: 'Magadheera', image: 'https://static.toiimg.com/photo/msid-11663880/11663880.jpg?24601' },
  ];

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) return;

    try {
      const res = await axios.get(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&namesearch=${query}`
      );

      const fetchedSongs = res.data.results.map(song => ({
        title: song.name || "Unknown Title",
        artist: song.artist_name || "Unknown Artist",
        rating: "★★★★☆",
        image: song.image || "https://via.placeholder.com/150",
        audio: song.audio
      }));

      setSongs(fetchedSongs);
    } catch (err) {
      console.error("Jamendo API Error:", err);
      setSongs([]);
    }
  };

  const filteredSongs = songs.filter(
    song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />

      <div className="playlists">
        <h2>Top Telugu Playlists</h2>
        <div className="playlist-grid">
          {playlists.map((playlist, index) => (
            <PlaylistCard
              key={index}
              title={playlist.title}
              image={playlist.image}
              onClick={() => navigate(`/playlist/${index}`)}
            />
          ))}
        </div>
      </div>

      <div className="songs">
        {searchQuery ? <h2>Search Results</h2> : <h2>Search Songs 🎧</h2>}

        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <SongItem
              key={index}
              title={song.title}
              artist={song.artist}
              rating={song.rating}
              image={song.image}
              audio={song.audio}
            />
          ))
        ) : (
          searchQuery ? (
            <p style={{ color: '#b3b3b3', textAlign: 'center' }}>
              No results found for "{searchQuery}"
            </p>
          ) : (
            <p style={{ color: '#b3b3b3', textAlign: 'center' }}>
              💡 Try: "romantic", "lofi", "happy", "beat"
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
