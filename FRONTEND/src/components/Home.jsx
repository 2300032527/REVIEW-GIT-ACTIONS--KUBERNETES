import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from './PlaylistCard';
import SongItem from './SongItem';
import SearchBar from './SearchBar';
import axios from 'axios';

const JAMENDO_CLIENT_ID = "68b75020"; // Only Client ID needed on frontend

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [apiSongs, setApiSongs] = useState([]);
  const navigate = useNavigate();

  // Hardcoded playlists for display
  const playlists = [
    { title: 'RRR Hits', image: 'https://image.tmdb.org/t/p/original/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg' },
    { title: 'Pushpa Anthems', image: 'https://is4-ssl.mzstatic.com/image/thumb/Music116/v4/c4/c3/8f/c4c38f8d-b579-8ce7-ef86-04dbb847ea06/cover.jpg/1200x1200bf-60.jpg' },
    { title: 'Guntur Kaaram Vibes', image: 'https://www.acmodasi.in/amdb/images/movie/0/k/guntur-kaaram-2024-TIjzLX.jpg' },
    { title: 'Animal', image: 'https://static1.showtimes.com/poster/660x980/animal-174150.jpg' },
    { title: 'Magadheera', image: 'https://picfiles.alphacoders.com/333/thumb-1920-333513.jpg' },
    { title: 'Doraemon', image: 'https://m.media-amazon.com/images/I/51dMgo8EChL._AC_UF894%2C1000_QL80_.jpg' },
    { title: 'Nenu Sailaja', image: 'https://images.openai.com/static-rsc-1/Vbb7LZ9FvuyvEXs4nCbTB9mX1rTebjrRlm3imaxikZWdxJPdHyNv0L0AcEdRWr3h60e1nLtQBodZOgNsQX5htbocdszl4791U1ywqqvGkkUC9i7NGflynG0xYewtkhnyml-JeZ9HNsTQMebQ3tTVyQ' },
    { title: 'Gabbar Singh', image: 'https://m.media-amazon.com/images/M/MV5BNjA2OTU5YTItZmFmMi00MmNkLTk1MWQtOWM3ODcwZWNjOTc4XkEyXkFqcGc%40._V1_.jpg' },
  ];

  // Hardcoded songs for search
  const staticSongs = [
    { title: 'Naatu Naatu', artist: 'MM Keeravani (RRR)', rating: '★★★★★', image: 'https://image.tmdb.org/t/p/original/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg', audio: '/audio/naatu.mp3' },
    { title: 'Dosti', artist: 'MM Keeravani (RRR)', rating: '★★★★☆', image: 'https://image.tmdb.org/t/p/original/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg', audio: '/audio/dosti.mp3' },
    { title: 'Oo Antava Mava', artist: 'Devi Sri Prasad (Pushpa)', rating: '★★★★☆', image: 'https://is4-ssl.mzstatic.com/image/thumb/Music116/v4/c4/c3/8f/c4c38f8d-b579-8ce7-ef86-04dbb847ea06/cover.jpg/1200x1200bf-60.jpg', audio: '/audio/antava.mp3' },
    { title: 'Srivalli', artist: 'Devi Sri Prasad (Pushpa)', rating: '★★★★★', image: 'https://is4-ssl.mzstatic.com/image/thumb/Music116/v4/c4/c3/8f/c4c38f8d-b579-8ce7-ef86-04dbb847ea06/cover.jpg/1200x1200bf-60.jpg', audio: '/audio/srivalli.mp3' },
    { title: 'Sailaja Sailaja', artist: 'Devi Sri Prasad', rating: '★★★★☆', image: 'https://upload.wikimedia.org/wikipedia/en/0/09/Nenu_Sailaja.jpg', audio: '/audio/Sailaja.mp3' },
    { title: 'Em cheppanu', artist: 'Devi Sri Prasad', rating: '★★★★★', image: 'https://images.openai.com/static-rsc-1/Vbb7LZ9FvuyvEXs4nCbTB9mX1rTebjrRlm3imaxikZWdxJPdHyNv0L0AcEdRWr3h60e1nLtQBodZOgNsQX5htbocdszl4791U1ywqqvGkkUC9i7NGflynG0xYewtkhnyml-JeZ9HNsTQMebQ3tTVyQ', audio: '/audio/Em cheppanu.mp3' },
    { title: 'Panchadara Bomma', artist: 'M.M. Keeravani (Magadheera)', rating: '★★★★★', image: 'https://static.toiimg.com/photo/msid-11663880/11663880.jpg?24601', audio: '/audio/panchadara_bomma.mp3' },
    { title: 'Dheera Dheera', artist: 'M.M. Keeravani (Magadheera)', rating: '★★★★☆', image: 'https://static.toiimg.com/photo/msid-11663880/11663880.jpg?24601', audio: '/audio/dheera.mp3' },
    { title: 'Doraemon', artist: 'M.M. Keeravani', rating: '★★★★★', image: 'https://m.media-amazon.com/images/I/51dMgo8EChL._AC_UF894%2C1000_QL80_.jpg', audio: '/audio/Doraemon.mp3' },
    { title: 'Dekho Dekho Gabbar Singh', artist: 'Devi Sri Prasad', rating: '★★★★☆', image: 'https://m.media-amazon.com/images/M/MV5BNjRmZTU4NjYtMjgzNC00ZWY5LThlMDUtNjc4MWRiZmQzM2VmXkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg', audio: '/audio/Gabbar Singh.mp3' },
     // Guntur Kaaram ✅ Add these
  { title: 'Oh My Baby', artist: 'Thaman S (Guntur Kaaram)', rating: '★★★★★', image: 'https://tse2.mm.bing.net/th/id/OIP.gCYi3PFVmNhtGefBTxFoPwHaLH?pid=Api&P=0&h=220', audio: '/audio/Oh My Baby.mp3' },
  { title: 'Kurchi Madathapetti', artist: 'Thaman S (Guntur Kaaram)', rating: '★★★★☆', image: 'https://m.media-amazon.com/images/I/81uxHSQ7KeL._AC_UF894%2C1000_QL80_.jpg', audio: '/audio/Kurchimadathapetti.mp3' },
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

      setApiSongs(fetchedSongs);
    } catch (err) {
      console.error("Jamendo API Error:", err);
      setApiSongs([]);
    }
  };

  // Combine static songs and API songs
  const allSongs = [...staticSongs, ...apiSongs];

  const filteredSongs = allSongs.filter(
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
