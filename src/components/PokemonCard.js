import React from 'react';

const PokemonCard = ({ data }) => {
  const { id, sprites, name } = data;
  return (
    <div className="pokemon-card">
      <h4>{id}</h4>
      <img src={sprites.front_default} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default PokemonCard;
