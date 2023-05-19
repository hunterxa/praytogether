import { redirect, useLoaderData } from 'react-router-dom'
import { signOutCurrentUser } from "../backend/firebase";

export async function loader() {
  try {
    signOutCurrentUser();
  } catch(err) {
    return err
  }

  const logoutMessage = "Successfully logged out."
  return redirect(`/login?message=${logoutMessage}`)
}

export default function Logout() {
  const data = useLoaderData();

  return (
    <div>
      {data && <p>data.error</p>}
    </div>
  )
}