import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PokemonCard from './PokemonCard';
import { Droppable } from 'react-beautiful-dnd';

const Box = ({ data, isDropDisabled }) => {
  return (
    <Card sx={{ margin: 2, backgroundColor: '#f0f0f0' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          My Box
        </Typography>
        <Droppable droppableId="box" isDropDisabled={isDropDisabled}>
          {(provided) => (
            <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
              {data.map((pokemon, index) => (
                <PokemonCard pokemon={pokemon} index={index} key={pokemon.id} />
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};

export default Box;
