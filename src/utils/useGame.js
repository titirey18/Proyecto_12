import { useEffect, useReducer } from 'react'

const initialState = {
  levels: 1,
  points: 0,
  pokemons: []
}

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POKEMONS':
      return { ...state, pokemons: action.payload }
    case 'INCREMENT_LEVEL':
      return { ...state, levels: state.levels + 1 }
    case 'INCREMENT_POINTS':
      return { ...state, points: state.points + 1 }
    default:
      return state
  }
}

const useGame = () => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState)

  const setPokemons = (pokemons) => {
    dispatch({ type: 'SET_POKEMONS', payload: pokemons })
  }

  const incrementLevel = () => {
    dispatch({ type: 'INCREMENT_LEVEL' })
  }

  const incrementPoints = () => {
    dispatch({ type: 'INCREMENT_POINTS' })
  }

  return {
    state,
    setPokemons,
    incrementLevel,
    incrementPoints
  }
}

export default useGame
