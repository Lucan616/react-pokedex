import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const Pokedex = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokedexData, setPokedexData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  const pokemonCards = pokemonData
    .filter((pokemon) => pokemon.name.includes(searchTerm))
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map((pokemon) => <PokemonCard key={pokemon.id} data={pokemon} />);

  // Getting Pokedex Info
  useEffect(() => {
    const getPokedexData = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setPokedexData(data.results);
    };

    getPokedexData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
  }, []);

  useEffect(() => {
    // const getPokemonData = async (url) => {
    //   const res = await fetch(url);
    //   const data = await res.json();
    //   return data;
    // };

    const populatedPokedex = pokedexData;

    populatedPokedex.forEach((pokemon) => populatePokedex(pokemon.url));

    // setPokemonData(
    //   populatedPokedex.map((pokemon) => {
    //     return getPokemonData(pokemon.url);
    //   })
    // );
  }, [pokedexData]);

  // Will be called in a map or forEach
  const populatePokedex = (url) => {
    const getPokemonData = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setPokemonData((prevPokemonData) => [...prevPokemonData, data]);
    };

    getPokemonData(url);
  };

  // Populating pokedex with pokemon
  // useEffect(() => {
  //   const getPokemonData = async (url) => {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     return data;
  //   };

  //   // pokedexData.forEach((pokemon) => {
  //   //   // const newPokemon = getPokemonData(pokemon.url);

  //   //   setPokemonData((prevPokemonData) => {
  //   //     return [...prevPokemonData, getPokemonData(pokemon.url)];
  //   //   });
  //   // });

  //   pokedexData.map((pokemon) => {
  //     return getPokemonData(pokemon.url);
  //   });
  // }, [pokedexData]);

  // console.log(pokemonData);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  return (
    <div>
      <h1>Pokedex</h1>
      <input
        type="text"
        name="searchTerm"
        value={searchTerm}
        onChange={handleChange}
      />
      <div style={style}>{pokemonCards}</div>
    </div>
  );
};

const style = {
  display: 'grid',
  gap: '1.25rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  maxWidth: 1000,
  margin: 'auto',
};

export default Pokedex;
