import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Page/Home/Home'
import Header from './Components/Header/HeaderNav'
import GuessEvolutions from './Page/GuessEvolutions/GuessEvolutions'
import GuessPokemon from './Page/GuessPokemons/Pokemons'

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<GuessPokemon />} />
        <Route path='/GuessEvolutions' element={<GuessEvolutions />} />
        <Route path='/Home/:name' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
