import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Dashboard</h1>
      {/* Render your team and box components here */}
    </div>
  );
};

export default Dashboard;
