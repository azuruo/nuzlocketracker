exports.getPokeApiPokemonSprite = (id) => {
  // https://stackoverflow.com/questions/69239521/unable-to-display-pokemon-image-from-pokeapi-co
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return url;
};
