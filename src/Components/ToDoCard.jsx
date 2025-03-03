import { motion } from "motion/react"
import Btn from "./Button"
import '../App.css'

const Card = ({todo, CompleteTask, DeleteTask}) => {
    return(
    <motion.li initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1.2, ease: 'easeIn'}} exit={{opacity: 0}} className='m-2 p-2 w-fit shadow-md shadow-black rounded-lg flex justify-between items-center bg-neutral-900 transition-all duration-300 hover:shadow-lg'>

        <p>{todo.name}</p>

          <span
            onClick={() => CompleteTask(todo.id, todo.isCompleted)}
            className="m-1 p-1 border-1 border-solid border-blue-700 rounded material-symbols-outlined transition-all duration-300 hover:bg-blue-700 hover:cursor-pointer"
          >
            {todo.isCompleted ? 'check_box' : 'check_box_outline_blank'}
          </span>

          <span
            onClick={() => DeleteTask(todo.id)}
            className="m-1 p-1 border-1 border-solid border-red-700 rounded material-symbols-outlined transition-all duration-300 hover:bg-red-700 hover:cursor-pointer"
          >
            delete
          </span>

      </motion.li>
    )
}
  
export default Card
  