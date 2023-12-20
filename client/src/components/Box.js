import React from 'react';

const Box = ({ data }) => {
  return (
    <div>
      <h2>My Box</h2>
      {data ? (
        <ul>
          {data.map((pokemon) => (
            <li key={pokemon.id}>{pokemon.name}</li>
          ))}
        </ul>
      ) : (
        <p>No box data available.</p>
      )}
    </div>
  );
};

export default Box;
