import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const PokeCard = ({ box }) => {
  return (
    <Grid container spacing={2}>
      {box.map((pokemon, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            <CardMedia
              sx={{
                height: 140,
                backgroundSize: 'contain',
              }}
              image={pokemon.image} // Ensure each Pokémon object has an 'image' property
              title={pokemon.name}
            />
            <CardContent sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Typography gutterBottom variant="h5" component="h2" sx={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'primary.main',
                textAlign: 'center',
                my: 1,
              }}>
                {pokemon.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
                textAlign: 'center',
                mb: 1,
              }}>
                Type: {pokemon.type} {/* Ensure 'type' is a property */}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
                textAlign: 'center',
              }}>
                Level: {pokemon.level} {/* Ensure 'level' is a property */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PokeCard;
