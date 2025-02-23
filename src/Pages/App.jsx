import { useState } from 'react'
import { Link } from 'react-router-dom'

import ToDo from '../Components/ToDo'
import Btn from '../Components/Button'

import { useAuth } from '../Hooks/auth'

import "../App.css"

function App() {
  const { session } = useAuth()

  return (
    <>

<h1 className='text-center text-7xl mt-30 mb-25 uppercase'> To do page</h1>
    <div className='flex justify-center'>

      {session ?
      (
        <>

        <Link to="/todo">
          <Btn className={"bg-blue-700 p-1 px-3 m-1 border-blue-700 hover:bg-transparent shadow-md shadow-black hover:shadow-blue-700"}>
            Make todos
          </Btn>
        </Link>
        
        </>
        
      )
      :
      (
        <>
        <Link to="/login">
          <Btn className={"bg-blue-700 p-1 px-3 m-1 border-blue-700 hover:bg-transparent shadow-md shadow-black hover:shadow-blue-700"}>
            LOGIN
          </Btn>
        </Link>
      
        <Link to="/signup">
          <Btn className={"hover:bg-blue-700 px-3 p-1 m-1 mx-2 border-blue-700 shadow-md shadow-black hover:shadow-lg"}>
            SIGNUP
          </Btn>
        </Link>
        </>
      )
      }
      
    </div>


    </>
  );
}

export default App;