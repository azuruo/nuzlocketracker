import React from 'react';

const Team = ({ data }) => {
  return (
    <div>
      <h2>My Team</h2>
      {data ? (
        <ul>
          {data.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      ) : (
        <p>No team data available.</p>
      )}
    </div>
  );
};

export default Team;
