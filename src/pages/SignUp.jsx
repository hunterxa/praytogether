import { Outlet } from 'react-router-dom'
import '../styles/signup.css'
import signupImage from '../assets/park_chapel.webp'

export default function SignUp() {

  return (
    <div className="signup">
      <img className="signup-image" src={signupImage} />
      <Outlet />
    </div>
  )
}