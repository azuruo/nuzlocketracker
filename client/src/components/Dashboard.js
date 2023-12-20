import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Team from './Team';
import Box from './Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  const [team, setTeam] = useState(null);
  const [box, setBox] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamAndBox = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const teamResponse = await axios.get('/api/teams/myteam', config);
        const boxResponse = await axios.get('/api/pokemonBoxes/mybox', config);

        setTeam(teamResponse.data);
        setBox(boxResponse.data);
      } catch (err) {
        setError(err.response.data.message || 'An error occurred');
      }
    };

    fetchTeamAndBox();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>{error}</p>
      </div>
    );
  }

return (
  <Container maxWidth="sm" sx={{ marginTop: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Dashboard
    </Typography>
    <Team data={team} /> {/* Pass the team data as props to the Team component */}
      <Box data={box} /> {/* Pass the box data as props to the Box component */}
  </Container>
);
};

export default Dashboard;
