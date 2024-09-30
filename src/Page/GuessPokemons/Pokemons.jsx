import React, { useEffect, useState } from 'react'
import './Pokemons.css'
import useGame from '../../utils/useGame'
import InfoLevels from '../../Components/Levels/Levels'
import { Link } from 'react-router-dom'

const GuessPokemon = () => {
  const { state, setPokemons, incrementLevel, incrementPoints } = useGame()
  const [randomPokemons, setRandomPokemons] = useState([])
  const [pokemonSelected, setPokemonSelected] = useState()

  const checkAnswer = (name) => {
    if (name.toLowerCase() === pokemonSelected.name.toLowerCase()) {
      incrementPoints()
    }
    incrementLevel()
    nextLevel(state.pokemons)
  }

  const nextLevel = (res) => {
    const randomIndices = []
    while (randomIndices.length < 4) {
      const randomIndex = Math.floor(Math.random() * res.length)
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex)
      }
    }
    setRandomPokemons(
      randomIndices.map((index) => {
        const pokemon = res[index]
        return {
          name: pokemon.name,
          sprite: pokemon.sprites.front_default
        }
      })
    )
    const selectedIndex = Math.floor(Math.random() * randomIndices.length)
    setPokemonSelected(res[randomIndices[selectedIndex]])
  }

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then((res) => res.json())
      .then((data) => {
        Promise.all(
          data.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          )
        ).then((res) => {
          setPokemons(res)
          nextLevel(res)
        })
      })
  }, [])

  return (
    <div className='guessPokemon'>
      <h1>Adivina el Pokémon</h1>
      <InfoLevels levels={state.levels} points={state.points} />
      <h3>
        ¿De quién es este Pokémon?
        {pokemonSelected && (
          <Link to={`/Home/${pokemonSelected.name}`}>
            {pokemonSelected.name.charAt(0).toUpperCase() +
              pokemonSelected.name.slice(1)}
          </Link>
        )}
      </h3>

      <div className='pokemons'>
        {randomPokemons.map((pokemon) => (
          <div
            className='img_wrp'
            key={pokemon.name}
            onClick={() => checkAnswer(pokemon.name)}
          >
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GuessPokemon
