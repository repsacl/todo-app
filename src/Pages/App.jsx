import { useState } from 'react'
import { Link } from 'react-router-dom'

import { motion } from 'motion/react'

import ToDo from '../Components/ToDo'
import Btn from '../Components/Button'

import { useAuth } from '../Hooks/auth'

import "../App.css"
import { transform } from 'motion'

function App() {
  const { session } = useAuth()

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .5, ease: "easeIn"}}>

      <h1 className='text-center text-7xl mt-30 mb-5 uppercase'>Make To-do's</h1>
      {session ?
      (
        <>
          <ToDo />
        
        </>
        
      )
      :
      (
        <>
        <div className='flex justify-center items-center mt-10'>
          <Link to="/login" className="uppercase text-4xl mx-1 px-1 text-shadow text-blue-700 transition-all duration-300 hover:text-white">login</Link>
          <Link to="/signup" className="uppercase text-4xl mx-1 px-1 text-shadow transition-all duration-300 hover:text-blue-700">signup</Link>
        </div>
        </>
      )}

    </motion.div>
  );
}

export default App;