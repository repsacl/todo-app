import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../Hooks/auth';
import supabase from '../../supabase-client';
import BTN from './Button';

function NavBar() {
  const { session } = useAuth();
  const [user, setUser] = useState(null)

  useEffect(() => {
    FetchUser()
  }, [])

  const FetchUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error){
      console.log('error fetching user', error)
    }
    else {
      setUser(data.user.user_metadata)
      //console.log("Users Name: ",data.user.user_metadata.full_name)
    }
  }

  return (
    <nav className="flex items-center justify-between w-full p-4 bg-rgb(240, 240, 240)">

      <Link to={"/"} className="mx-2 justify-start">HOME</Link>

      <ul className="flex md:space-x-6 space-x-4 md:text-lg text-sm font-medium md:px-6 px-1">
        {session ? (
          <Link to="/profile" className="uppercase transition-all duration-300 hover:text-blue-700">{user && user.full_name}</Link>
        ) : (
          <>
            <Link to="/login" className="uppercase text-shadow text-blue-700 transition-all duration-300 hover:text-white">login</Link>
            <Link to="/signup" className="uppercase text-shadow transition-all duration-300 hover:text-blue-700">signup</Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;