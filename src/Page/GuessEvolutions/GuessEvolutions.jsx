import React, { useEffect, useState } from 'react'
import './GuessEvolutions.css'
import useGame from '../../utils/useGame'
import InfoLevels from '../../Components/Levels/Levels'

const GuessEvolutions = () => {
  const { state, setPokemons, incrementLevel, incrementPoints } = useGame()
  const [evolutionSelected, setEvolutionSelected] = useState(0)
  const [pokemon, setPokemon] = useState()

  const getRandomPokemon = (res) => {
    const randomIndex = Math.floor(Math.random() * res.length)
    setPokemon(res[randomIndex])
  }

  const fetchEvolutions = (speciesUrl) => {
    fetch(speciesUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching evolutions')
        return res.json()
      })
      .then((data) => {
        const evolutionsCount = countEvolutions(data.evolution_chain)
        setEvolutionSelected(evolutionsCount)
      })
      .catch((error) => console.error('Error fetching evolutions:', error))
  }

  const countEvolutions = (res) => {
    if (!res || !res.evolves_to) return 0

    let count = 0

    const countRecursive = (chain) => {
      if (!chain.evolves_to || chain.evolves_to.length === 0) return
      count += chain.evolves_to.length
      chain.evolves_to.forEach(countRecursive)
    }

    countRecursive(res)
    return count
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
          getRandomPokemon(res)
        })
      })
      .catch((error) => console.error('Error fetching Pokémon:', error))
  }, [])

  useEffect(() => {
    if (pokemon) {
      fetchEvolutions(pokemon.species.url)
    }
  }, [pokemon])
  const check = () => {
    if (!pokemon) return

    const actualEvolutionsCount = countEvolutions(pokemon.evolution_chain)

    if (evolutionSelected >= 0 && evolutionSelected === actualEvolutionsCount) {
      incrementPoints()
    }

    incrementLevel()
    getRandomPokemon(state.pokemons)
  }

  return (
    <div className='evolutions'>
      <h2>¿Cuántas evoluciones crees que tiene {pokemon?.name}?</h2>
      <InfoLevels levels={state.levels} points={state.points} />
      <div className='img_wrp'>
        <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
      </div>
      <input
        type='number'
        className='input-evolutions'
        max={10}
        min={0}
        defaultValue={0}
        onChange={(e) => setEvolutionSelected(parseInt(e.target.value))}
      />
      <button className='check' onClick={check}>
        Comprobar
      </button>
    </div>
  )
}

export default GuessEvolutions
