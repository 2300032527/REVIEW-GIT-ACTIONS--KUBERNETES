import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newArtistName, setNewArtistName] = useState('');

  // Direct backend URL
  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${API_BASE_URL}/api/users`, {
      headers: { 'x-access-token': token }
    })
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));

    axios.get(`${API_BASE_URL}/api/artists`, {
      headers: { 'x-access-token': token }
    })
      .then(res => setArtists(res.data))
      .catch(err => console.error('Error fetching artists:', err));
  }, []);

  const deleteUser = (userId) => {
    const token = localStorage.getItem('token');
    axios.delete(`${API_BASE_URL}/api/users/${userId}`, {
      headers: { 'x-access-token': token }
    })
      .then(() => setUsers(users.filter(u => u.id !== userId)))
      .catch(err => console.error('Error deleting user:', err));
  };

  const addArtist = () => {
    const token = localStorage.getItem('token');
    axios.post(`${API_BASE_URL}/api/artists`, { name: newArtistName }, {
      headers: { 'x-access-token': token }
    })
      .then(res => {
        setArtists([...artists, res.data]);
        setNewArtistName('');
      })
      .catch(err => console.error('Error adding artist:', err));
  };

  const deleteArtist = (artistId) => {
    const token = localStorage.getItem('token');
    axios.delete(`${API_BASE_URL}/api/artists/${artistId}`, {
      headers: { 'x-access-token': token }
    })
      .then(() => setArtists(artists.filter(a => a.id !== artistId)))
      .catch(err => console.error('Error deleting artist:', err));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: '#fff' }}>
      <h2>Admin Panel</h2>

      <section style={{ marginBottom: '40px' }}>
        <h3>Manage Users</h3>
        <ul>
          {users.map(user => (
            <li key={user.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              {user.username} ({user.role})
              <button onClick={() => deleteUser(user.id)} style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Manage Artists</h3>
        <input
          type="text"
          value={newArtistName}
          onChange={(e) => setNewArtistName(e.target.value)}
          placeholder="Artist Name"
          style={{ padding: '10px', marginRight: '10px', backgroundColor: '#252525', color: '#fff', border: '1px solid #333' }}
        />
        <button onClick={addArtist} style={{ backgroundColor: '#1db954', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Add Artist</button>
        <ul style={{ marginTop: '20px' }}>
          {artists.map(artist => (
            <li key={artist.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              {artist.name}
              <button onClick={() => deleteArtist(artist.id)} style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;
