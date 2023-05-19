import { Form, useLoaderData, redirect, Link, useActionData } from 'react-router-dom'
import { signInUser, checkUserLoggedIn } from '../backend/firebase'
import '../styles/login.css'
import loginImage from '../assets/park_chapel.webp'

export function loader({ request }) {
  if (checkUserLoggedIn()) {
    return redirect('/home')
  }
  
  return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
  const redirectTo = new URL(request.url).searchParams.get("redirectTo")
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  console.log("signing in")
  try {
    await signInUser(email, password)
  } catch(err) {
    return err
  }
  console.log("signed in, redirecting")
  return redirect(redirectTo || '/home')
}

export default function Login() {
  const message = useLoaderData();
  const errors = useActionData();

  return (
    <div className="login">
      <img className="login-image" src={loginImage} />
      <h2 className="login-title">Log In</h2>
      {message && <h3 className="login-message">{message}</h3>}
      {errors?.message && <h3 className="login-error">{errors.message}</h3>}
      <Form
        method="post"
        className="login-form"
        replace
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />

        {/*TODO: Use navigation to disable this button when submitting*/}
        <button className="button-transform" type="submit">Submit</button>
      </Form>

      <Link to="/signup" className="login-to-signup">create an account</Link>
    </div>
  )
}