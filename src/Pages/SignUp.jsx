import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase-client';
import { Link } from "react-router-dom";

import { motion } from 'motion/react';

import '../App.css';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      const { user } = data;
      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: name },
      });

      if (updateError) {
        setMessage(updateError.message);
        return;
      }

      setMessage("User account created!");
      navigate("/todo");
      return null;
    }

    setEmail("");
    setPassword("");
  };

  const GoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `https://repsacl.github.io/todo-app/todo`,
      },
    });

    if (error) {
      console.error('Error logging in with Google:', error.message);
    }
    // else{
    //   navigate("/todo");
    // }

  }
  return (
    <>
      <div className="bg-cover bg-center bg-fixed">
        <div className="h-200 flex justify-center items-center">
          <motion.div initial={{opacity: 0, scale: .9}} animate={{opacity: 1, scale: 1}} transition={{duration: .5, ease: 'easeInOut'}} className="bg-neutral-900 mx-4 p-8 rounded shadow-xl w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-3xl font-bold mb-8 text-center">Create an account</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold text-gray-400 mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold text-gray-400 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold text-gray-400 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-400 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  required
                  placeholder="Enter your password"
                />
                <Link className="text-gray-500 hover:text-gray-800" to="/login">Already have an account?</Link>
              </div>

              <div className="mb-6">
                {message && <span>{message}</span>}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>

            <button
            className="mb-3 font-bold shadow-sm rounded-lg p-2 border-1 border-solid border-blue-700 text-gray-200 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-blue-700"
            onClick={GoogleLogin}
            >
            <div className="bg-white p-2 rounded-full">
              <svg className="w-4" viewBox="0 0 533.5 544.3">
                <path
                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                fill="#4285f4" />
                <path
                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                fill="#34a853" />
                <path
                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                fill="#fbbc04" />
                <path
                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                fill="#ea4335" />
              </svg>
            </div>

            <span className="ml-4">
              Sign Up with Google
              </span>
          </button>

          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SignUp
