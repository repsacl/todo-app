import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import App from './Pages/App.jsx'
import ToDo from './Pages/ToDo.jsx'
import Profile from './Pages/Profile.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Nopage from './Pages/NoPage.jsx'

import Wrapper from './Pages/Wrapper.jsx'

import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { AuthProvider } from './Hooks/auth'

import './index.css'

function Layout() {
  return (
    <>
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Nopage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/todo',
        element: <Wrapper><ToDo /></Wrapper>,
      },
      {
        path: '/profile',
        element: <Wrapper><Profile/></Wrapper>
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
], {
  basename: '/todo-app' // Ensure this matches your repository name
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
