import React from 'react'
import './style/header.css';

function Header({children}) {
  return (
    <div className='header-container'>
      {children}
    </div>
  )
}

export default Header