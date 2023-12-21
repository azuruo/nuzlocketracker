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
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%', // Make card full height of Grid item
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' // Soft shadow around the card
            }}
          >
            <CardMedia
              sx={{
                height: 140, // Fixed height for the image
                backgroundSize: 'contain', // To make sure the entire Pokémon image is visible
              }}
              image={pokemon.image}
              title={pokemon.name}
            />
            <CardContent sx={{
              flexGrow: 1, // Allows content to fill the space in the flex container
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Center the content vertically
              alignItems: 'center', // Center the content horizontally
            }}>
              <Typography gutterBottom variant="h5" component="h2" sx={{
                fontSize: '1.25rem', // Equivalent to 20px
                fontWeight: 'bold', // Make the name stand out
                color: 'primary.main', // Use the primary color from the theme
                textAlign: 'center', // Center-align the text
                my: 1, // Margin top and bottom for spacing
              }}>
                {pokemon.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" sx={{
                fontSize: '0.875rem', // Equivalent to 14px
                color: 'text.secondary', // Use the secondary text color from the theme
                textAlign: 'center', // Center-align the text
                mb: 1, // Margin bottom for spacing
              }}>
                Type: {pokemon.type}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" sx={{
                fontSize: '0.875rem', // Equivalent to 14px
                color: 'text.secondary', // Use the secondary text color from the theme
                textAlign: 'center', // Center-align the text
              }}>
                Level: {pokemon.level}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonBox;

