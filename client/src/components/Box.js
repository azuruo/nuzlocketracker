import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Box = ({ data }) => {
  return (
    <Card sx={{ margin: 2, backgroundColor: '#f0f0f0' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          My Box
        </Typography>
        {data ? (
          <List>
            {data.map((pokemon) => (
              <ListItem key={pokemon.id}>{pokemon.name}</ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">No box data available.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Box;
