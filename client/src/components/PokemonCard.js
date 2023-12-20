import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Draggable } from 'react-beautiful-dnd';

const PokemonCard = ({ pokemon, index }) => {
  return (
    <Draggable draggableId={pokemon.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            // Add some styles for dragging state
            boxShadow: snapshot.isDragging ? "0px 0px 10px #888888" : "none",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={pokemon.sprite}
            alt={pokemon.name}
          />
        </Card>
      )}
    </Draggable>
  );
};

export default PokemonCard;
