import { redirect } from 'react-router-dom'
import { checkUserLoggedIn } from './firebase'

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname
  if (!checkUserLoggedIn()) {
    const message = 'You need to be logged in to access that page.'
    throw redirect(
      `/login?message=${message}&redirectTo=${pathname}`
    )
  }
  
  return true
}

/*  export a function that takes two arguments: both passwords
    and checks that they follow the following rules: must be 10
    characters long, must have at least one capital letter, must 
    have at least one lowercase letter, must have at least one 
    special character, must have at least one number */
export function validatePassword(password1, password2) {
    if (password1 !== password2) {
      throw new Error("Passwords do not match")
    } else if (password1.length < 10) {
      throw new Error("Password must be at least 10 characters long")
    } else if (!password1.match(/[A-Z]/)) {
      throw new Error("Password must contain at least one capital letter")
    } else if (!password1.match(/[a-z]/)) {
      throw new Error("Password must contain at least one lowercase letter")
    } else if (!password1.match(/[!@#$%^&*]/)) {
      throw new Error("Password must contain at least one special character (!@#$%^&*)")
    } else if (!password1.match(/[0-9]/)) {
      throw new Error("Password must contain at least one number")
    } 
}

/* export a function that takes an error message and compares it to 
   the firebase error codes and returns a more user friendly error message */
export function getErrorMessage(error) {
  const errorCode = error.code
  const errorMessage = error.message
  console.log("code: ", errorCode, "message: ", errorMessage)
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "The email address is already in use by another account."
    case "auth/invalid-email":
      return "The email address is badly formatted."
    case "auth/operation-not-allowed":
      return "This operation is not allowed."
    case "auth/weak-password":
      return "The password is too weak."
    case "auth/user-disabled":
      return "The user corresponding to the given email has been disabled."
    case "auth/user-not-found":
      return "No user found with that email."
    case "auth/wrong-password":
      return "The password is invalid for the given email."
    default:
      return errorMessage
  }
}

//export a function that takes a string and returns true if:
// 1. it is not empty
// 2. it does not contain any special characters
// 3. it is not longer than 20 characters
//otherwise throws an error with a message
export function validateDisplayName(username) {
  if (username.length === 0) {
    throw new Error("Display name cannot be empty")
  } else if (username.length > 20) {
    throw new Error("Display name cannot be longer than 20 characters")
  } else if (username.match(/[!@#$%^&*]/)) {
    throw new Error("Display name cannot contain special characters")
  } else {
    return true
  }
}