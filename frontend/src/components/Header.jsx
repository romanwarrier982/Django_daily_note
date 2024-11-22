import React from 'react'
import {BsMoonStarsFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Header = ({darkMode,setDarkMode}) => {
  return (
    <div className='flex justify-between items-baseline'>
      <Link to='/' role="link">
        <div className='dark:text-white  text-4xl py-3  font-bold'>Notes.</div>
      </Link>
      <BsMoonStarsFill role="img" onClick={() => setDarkMode(!darkMode)} className='dark:text-white text-xl cursor-pointer'/>
    </div>
  )
}

export default Header