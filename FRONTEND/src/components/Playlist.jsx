import React from 'react';
import { useParams } from 'react-router-dom';
import SongItem from './SongItem';

const Playlist = () => {
  const { id } = useParams();
  const playlists = [
    {
      id: 0,
      title: 'RRR Hits',
      poster: 'https://image.tmdb.org/t/p/original/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg',
      songs: [
        {
          title: 'Naatu Naatu',
          artist: 'MM Keeravani (RRR)',
          rating: '★★★★★',
          image: 'https://image.tmdb.org/t/p/original/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg',
          audio: '/audio/naatu.mp3',
        },
        {
          title: 'Dosti',
          artist: 'MM Keeravani (RRR)',
          rating: '★★★★☆',
          image: 'https://image.tmdb.org/t/p/original/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg',
          audio: '/audio/dosti.mp3',
        },
      ],
    },
    {
      id: 1,
      title: 'Pushpa Hits',
      poster: 'https://is4-ssl.mzstatic.com/image/thumb/Music116/v4/c4/c3/8f/c4c38f8d-b579-8ce7-ef86-04dbb847ea06/cover.jpg/1200x1200bf-60.jpg',
      songs: [
        {
          title: 'Oo Antava Mava',
          artist: 'Devi Sri Prasad (Pushpa)',
          rating: '★★★★☆',
          image: 'https://is4-ssl.mzstatic.com/image/thumb/Music116/v4/c4/c3/8f/c4c38f8d-b579-8ce7-ef86-04dbb847ea06/cover.jpg/1200x1200bf-60.jpg',
          audio: '/audio/antava.mp3',
        },
        {
          title: 'Srivalli',
          artist: 'Devi Sri Prasad (Pushpa)',
          rating: '★★★★★',
          image: 'https://is4-ssl.mzstatic.com/image/thumb/Music116/v4/c4/c3/8f/c4c38f8d-b579-8ce7-ef86-04dbb847ea06/cover.jpg/1200x1200bf-60.jpg',
          audio: '/audio/srivalli.mp3',
        },
      ],
    },
    {
      id: 2,
      title: 'Guntur Kaaram Hits',
      poster: 'https://www.acmodasi.in/amdb/images/movie/0/k/guntur-kaaram-2024-TIjzLX.jpg',
      songs: [
        {
          title: 'oh my baby',
          artist: 'Thaman S (Guntur Kaaram)',
          rating: '★★★★★',
          image: 'https://tse2.mm.bing.net/th/id/OIP.gCYi3PFVmNhtGefBTxFoPwHaLH?pid=Api&P=0&h=220',
          audio: '/audio/Oh My Baby.mp3',
        },
        {
          title: 'Kurchi Madathapetti',
          artist: 'Thaman S (Guntur Kaaram)',
          rating: '★★★★☆',
          image: 'https://m.media-amazon.com/images/I/81uxHSQ7KeL._AC_UF894%2C1000_QL80_.jpg',
          audio: '/audio/Kurchimadathapetti.mp3',
        },
      ],
    },
    {
      id: 3,
      title: 'Animal Hits',
      poster: 'https://static1.showtimes.com/poster/660x980/animal-174150.jpg',
      songs: [
        {
          title: 'Evarevaro',
          artist: 'Vishal Mishra',
          rating: '★★★★☆',
          image: 'https://m.media-amazon.com/images/M/MV5BZThmNDg1NjUtNWJhMC00YjA3LWJiMjItNmM4ZDQ5ZGZiN2Y2XkEyXkFqcGc%40._V1_.jpg',
          audio: '/audio/Evarevaro.mp3',
        },
        {
          title: 'Ney Veyrey',
          artist: 'Arijit Singh',
          rating: '★★★★★',
          image: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2019/09/Animal-4.jpg',
          audio: '/audio/Ney Veyrey.mp3',
        },
      ],
    },
    {
      id: 4,
      title: 'Magadheera Hits',
      poster: 'https://picfiles.alphacoders.com/333/thumb-1920-333513.jpg',
      songs: [
        {
          title: 'Panchadara Bomma',
          artist: 'M.M. Keeravani (Magadheera)',
          rating: '★★★★★',
          image: 'https://static.toiimg.com/photo/msid-11663880/11663880.jpg?24601',
          audio: '/audio/panchadara_bomma.mp3',
        },
        {
          title: 'Dheera Dheera',
          artist: 'M.M. Keeravani (Magadheera)',
          rating: '★★★★☆',
          image: 'https://static.toiimg.com/photo/msid-11663880/11663880.jpg?24601',
          audio: '/audio/dheera.mp3',
        },
      ],
    },
    {
      id: 5,
      title: 'Doremon Hits',
      poster: 'https://m.media-amazon.com/images/I/51dMgo8EChL._AC_UF894%2C1000_QL80_.jpg',
      songs: [
        {
          title: 'Doraemon',
          artist: 'M.M. Keeravani',
          rating: '★★★★★',
          image: 'https://m.media-amazon.com/images/I/51dMgo8EChL._AC_UF894%2C1000_QL80_.jpg',
          audio: '/audio/Doraemon.mp3',
        },
      ],
    },
    {
      id: 6,
      title: 'Nenu sailaja Hits',
      poster: 'https://images.openai.com/static-rsc-1/Vbb7LZ9FvuyvEXs4nCbTB9mX1rTebjrRlm3imaxikZWdxJPdHyNv0L0AcEdRWr3h60e1nLtQBodZOgNsQX5htbocdszl4791U1ywqqvGkkUC9i7NGflynG0xYewtkhnyml-JeZ9HNsTQMebQ3tTVyQ',
      songs: [
        {
          title: 'Sailaja Sailaja',
          artist: 'Devi Sri Prasad ',
          rating: '★★★★☆',
          image: 'https://upload.wikimedia.org/wikipedia/en/0/09/Nenu_Sailaja.jpg' ,
          audio: '/audio/Sailaja.mp3',
        },
        {
          title: 'Em cheppanu',
          artist: 'Devi Sri Prasad',
          rating: '★★★★★',
          image: 'https://images.openai.com/static-rsc-1/Vbb7LZ9FvuyvEXs4nCbTB9mX1rTebjrRlm3imaxikZWdxJPdHyNv0L0AcEdRWr3h60e1nLtQBodZOgNsQX5htbocdszl4791U1ywqqvGkkUC9i7NGflynG0xYewtkhnyml-JeZ9HNsTQMebQ3tTVyQ' ,
          audio: '/audio/Em cheppanu.mp3',
        },
      ],
    },
    {
      id: 7,
      title: 'Gabbar Singh',
      poster: 'https://m.media-amazon.com/images/M/MV5BNjA2OTU5YTItZmFmMi00MmNkLTk1MWQtOWM3ODcwZWNjOTc4XkEyXkFqcGc%40._V1_.jpg',
      songs: [
        {
          title: 'Dekho Dekho Gabbar Singh',
          artist: 'Devi Sri Prasad ',
          rating: '★★★★☆',
          image: 'https://m.media-amazon.com/images/M/MV5BNjRmZTU4NjYtMjgzNC00ZWY5LThlMDUtNjc4MWRiZmQzM2VmXkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg' ,
          audio: '/audio/Gabbar Singh.mp3',
        },
      ],
    },
  ];

  const playlist = playlists.find((p) => p.id === parseInt(id));
  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div className="playlist-page" style={{ padding: '20px', backgroundColor: '#121212', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={playlist.poster}
        alt={`${playlist.title} Poster`}
        style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
      />
      <h2 style={{ marginTop: '0', fontSize: '24px' }}>{playlist.title}</h2>
      <div className="songs" style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
        {playlist.songs.map((song, index) => (
          <SongItem
            key={index}
            title={song.title}
            artist={song.artist}
            rating={song.rating}
            image={song.image}
            audio={song.audio}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;