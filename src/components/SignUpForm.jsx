import { useState } from 'react'
import { useActionData, Form, Link, redirect } from 'react-router-dom'
import PasswordTips from './PasswordTips'
import { validatePassword, validateDisplayName } from '../backend/authUtils'
import { 
  createNewUser, 
  checkUserLoggedIn
} from '../backend/firebase'
import '../styles/signup.css'

export function loader() {
  if (checkUserLoggedIn()) {
    return redirect('/home')
  }
  return null
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const displayName = formData.get('display-name')
  const password = formData.get('password')
  const passwordConfirm = formData.get('password-confirm')

  try {
    validatePassword(password, passwordConfirm)
  } catch(err) {
    return err
  }
  try {
    validateDisplayName(displayName)
  } catch (err) {
    return err
  }

  try {
    await createNewUser(email, password, displayName)
      .then(() => {
        console.log("user created")
        return redirect('/home')
      })
  } catch(err) {
    return err
  }

  return new Error("Error signing up")
}

export default function SignUpForm() {
  const [showTips, setShowTips] = useState(false)
  const error = useActionData()

  return (
    <>
      <h2 className="signup-title">Sign Up</h2>
        {error && <p className="signup-error">{error.message}</p>}
        <Form
          method="post"
          className="signup-form"
          replace
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            name="display-name"
            type="text"
            placeholder="Display Name"
            autoComplete="username"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <input
            name="password-confirm"
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />

          {/*TODO: Use navigation to disable this button when submitting*/}
          <button type="submit">Submit</button>
        </Form>

        <div className="signup-options">
          <Link to="/login" className="signup-options-button">
            log in
          </Link>
          <button 
            className="signup-options-button"
            onClick={() => setShowTips(prevShowTips => !prevShowTips)}
          >
            show password tips
          </button>

        </div>
        {showTips && <PasswordTips />}
      </>
  )
}