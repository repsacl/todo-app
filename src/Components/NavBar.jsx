import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../Hooks/auth';
import supabase from '../../supabase-client';
import BTN from './Button';

function NavBar() {
  const { session } = useAuth();

  return (
    <nav className="flex items-center justify-between w-full p-4 border-b bg-rgb(240, 240, 240)">

      <Link to={"/"} className="mx-2 justify-start">LOGO</Link>

      <ul className="flex md:space-x-6 space-x-4 md:text-lg text-sm font-medium md:px-6 px-1">
        {session ? (
          <Link to="/profile"><BTN className={"p-1 px-3 m-1 hover:text-black hover:bg-white"}>Profile</BTN></Link>
        ) : (
          <div>
            <Link to="/login">
              <BTN className={"bg-blue-700 p-1 px-3 m-1 border-blue-700 hover:bg-transparent shadow-md shadow-black hover:shadow-blue-700"}>
                LOGIN
              </BTN>
            </Link>
            <Link to="/signup">
              <BTN className={"hover:bg-blue-700 px-3 p-1 m-1 border-blue-700 shadow-md shadow-black hover:shadow-lg"}>
                SIGNUP
              </BTN>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;