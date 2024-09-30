import { NavLink } from 'react-router-dom'
import './HeaderNav.css'

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Adivina el Pokemon</NavLink>
          </li>
          <li>
            <NavLink to='/GuessEvolutions'>De que tipo son:</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
