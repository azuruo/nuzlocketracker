// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Boxes = () => {
//   const [boxes, setBoxes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchBoxes = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const response = await axios.get('/api/userBoxes', config); // Replace with your API endpoint
//         setBoxes(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch user boxes:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchBoxes();
//   }, []);

//   return (
//     <div>
//       <h1>Your Pokémon Boxes</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : boxes.length === 0 ? (
//         <p>No Pokémon boxes found.</p>
//       ) : (
//         <div>
//           {boxes.map((box, index) => (
//             <div key={index}>
//               <h2>Box {box.boxNumber}</h2>
//               <ul>
//                 {box.pokemon.map((pokemon, pokemonIndex) => (
//                   <li key={pokemonIndex}>{pokemon.nickname}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Boxes;
