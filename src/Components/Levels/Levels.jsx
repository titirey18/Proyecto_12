import React from 'react'
import './levels.css'

const InfoLevels = ({ levels, points }) => {
  return (
    <div className='info-levels'>
      <h3>Nivel: {levels}</h3>
      <h3>Puntos: {points}</h3>
    </div>
  )
}

export default InfoLevels
