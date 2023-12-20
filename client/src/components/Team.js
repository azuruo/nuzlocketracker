import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Droppable } from 'react-beautiful-dnd';
import PokemonCard from './PokemonCard';

const Team = ({ data }) => {
  return (
    <Card sx={{ margin: 2, backgroundColor: '#f0f0f0' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          My Team
        </Typography>
        <Droppable droppableId="team" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {data.map((member, index) => (
                <PokemonCard member={member} index={index} key={member.id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};

export default Team;
