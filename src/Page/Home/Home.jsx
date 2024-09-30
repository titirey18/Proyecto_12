import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Home.css'
const Pokemon = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error('Error fetching Pokémon:', error))
  }, [name])

  return (
    <div className='pokemon'>
      {pokemon && (
        <>
          <h2>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <div className='img_wrp'>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <p>Altura: {pokemon.height * 10} cm</p>
          <p>Peso: {pokemon.weight / 10} kg</p>
          <p>Tipos:</p>
          <ul>
            {pokemon.types.map((type) => (
              <li key={type.type.name}>{type.type.name}</li>
            ))}
          </ul>
          <p>
            Habilidades:
            <ul>
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </p>
          <p>
            Stats:
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </p>
        </>
      )}
    </div>
  )
}

export default Pokemon
