import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team from './Team';
import Box from './Box';
import AddPokemonForm from './AddPokemonForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DragDropContext } from 'react-beautiful-dnd';
import CircularProgress from '@mui/material/CircularProgress';


const Dashboard = () => {
  const [team, setTeam] = useState([]);
  const [box, setBox] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTeamAndBox = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const teamResponse = await axios.get('/api/teams', config);
        const boxResponse = await axios.get('/api/pokemonBoxes', config);

        setTeam(teamResponse.data);
        setBox(boxResponse.data);
      } catch (err) {
        setError(err.response?.data.message || 'An error occurred');
      }
    };

    setIsLoading(true);
    fetchTeamAndBox().finally(() => setIsLoading(false));
  }, []);

  const onDragEnd = (result) => {
    const { destination, source } = result;
  
    // If there's no destination (dropped outside the lists), do nothing
    if (!destination) {
      return;
    }
  
    // Check if the location of the draggable item changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    let newTeam = [...team];
    let newBox = [...box];
  
    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      const sourceList = source.droppableId === 'team' ? newTeam : newBox;
      const [removed] = sourceList.splice(source.index, 1);
      sourceList.splice(destination.index, 0, removed);
    } else {
      // Moving between lists
      const sourceList = source.droppableId === 'team' ? newTeam : newBox;
      const destList = destination.droppableId === 'team' ? newTeam : newBox;
      const [removed] = sourceList.splice(source.index, 1);
  
      // Add to destination list
      destList.splice(destination.index, 0, removed);
    }
  
    // Update state
    setTeam(newTeam);
    setBox(newBox);
  };
  
  const handleAddPokemonToBox = (newPokemon) => {
    if (box.length >= 30) {
      alert('Box is full!'); // Notify user if the box is full
      return;
    }
    setBox(currentBox => [newPokemon, ...currentBox]);
  };
  
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <AddPokemonForm onPokemonAdd={handleAddPokemonToBox} />
        <Team data={team} />
        <Box data={box} isDropDisabled={team?.length >= 6} />
      </Container>
    </DragDropContext>
  );
};

export default Dashboard;
