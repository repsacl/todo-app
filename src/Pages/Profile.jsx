import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import supabase from "../../supabase-client"

import { motion } from "motion/react";

import Btn from "../Components/Button"
import { useAuth } from "../Hooks/auth";

function Profile() {
  const [user, setUser] = useState(null)
  const { session } = useAuth();
  const navigate = useNavigate();

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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log("Signed out");
    }

    navigate("/");
  };

  return (
    <>
      <motion.div initial={{opacity: 0, scale: .9}} animate={{opacity: 1, scale: 1}} transition={{duration: .5, ease: 'easeInOut'}} className="flex flex-col justify-center items-center">
        {user ? (
          <>
            <h1 className="text-5xl mt-30 mb-3 text-center">Welcome <span className="text-blue-700">{user.full_name}</span></h1>
            <p className="text-xl mb-15 text-center">This is the profile page</p>
          </>
        ) : (
          <>
            <h1 className="text-5xl mt-30 mb-20 text-center">User page</h1>
          </>
        )}
        <Btn className={"p-1 px-3 m-1 hover:text-black hover:bg-white"} onClick={signOut}>Sign Out</Btn>
      </motion.div>
    </>
  )
}

export default Profile