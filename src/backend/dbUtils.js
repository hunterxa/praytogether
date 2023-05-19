import { getUserById } from "./firebase";

export async function getUsernameById(userId) {
  const user = await getUserById(userId)
  return user.displayName
}