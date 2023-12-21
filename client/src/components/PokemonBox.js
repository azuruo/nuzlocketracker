import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const PokemonBox = ({ box }) => {
  return (
    <Grid container spacing={2}>
      {box.map((pokemon, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              // Assume each pokemon object has an 'image' property with a URL
              image={pokemon.image}
              title={pokemon.name}
              style={{ height: 140 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {pokemon.name}
              </Typography>
              {/* Display additional Pokémon details here */}
              <Typography variant="body2" color="textSecondary" component="p">
                Type: {pokemon.type}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Level: {pokemon.level}
              </Typography>
              {/* Add more details as needed */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonBox;
