import { initializeApp } from "firebase/app"
import { 
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
} from "firebase/auth";
import { 
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  query,
  where
} from "firebase/firestore"
import { getErrorMessage } from "./authUtils"

const firebaseConfig = {
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

/*** Authentication and User Creation ***/

//TODO: validate that username does not include special characters, and create user in firestore
export async function createNewUser(email, password, displayName) {
  let error = null
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await addUserToFirestore(user, displayName)
        .then(() => console.log("user added to firestore"))
        .catch(err => {error = err})
    })
    .catch((err) => {error = err});

  if (error) {
    throw new Error(error.message)
  }
}

export async function addUserToFirestore(user, displayName) {
  console.table(user)
  const userDocRef = doc(db, "users", user.uid)
  const userDocSnap = await getDoc(userDocRef)
  if (userDocSnap.exists()) {
    throw new Error("User already exists in firestore")
  }

  const newUser = {
    displayName: displayName,
    email: user.email,
    friends: []
  }
  return setDoc(userDocRef, newUser)
}

export async function signInUser(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user signed in", user.uid)
      return user;
    })
    .catch((err) => {
      const message = getErrorMessage(err)
      //Rethrowing error to be handled in Signup and display information to user
      throw new Error(message, err)
    })
}

export function checkUserLoggedIn() {
  if (auth.currentUser) {
    return true
  } else {
    return false
  }
}

export async function getCurrentUser() {
  const user = auth.currentUser
  if (!user) {
    return null
  }
  
  return await getUserFromFirestoreById(user.uid)
}

export function getCurrentAuthUser() {
  return auth.currentUser;
}

export function signOutCurrentUser() {
  auth.signOut().then(() => {
    console.log("user signed out")
    return true;
  }).catch((error) => {
    console.log("Error signing out", error)
    throw new Error("Error signing out", error)
  })
}

/*** Firestore data creation and retrieval ***/

export async function createNewGroup(groupName, groupType) {
  const userDocRef = doc(db, "users", auth.currentUser.uid)
  const groupDocRef = await addDoc(collection(db, "groups"), {
    name: groupName,
    type: groupType,
    members: [userDocRef],
    posts: [],
    owner: userDocRef,
    invites: []
  })

  return groupDocRef.id
}

//TODO: check if the group is closed
export async function addCurrentUserToGroup(groupId) {
  const groupDocRef = doc(db, "groups", groupId)
  const groupDocSnap = await getDoc(groupDocRef)
  if (!groupDocSnap.exists()) {
    throw new Error("No group with that id found")
  }
  if (!checkUserLoggedIn()) {
    throw new Error("User not logged in")
  }

  const userDocRef = doc(db, "users", auth.currentUser.uid)
  if (groupDocSnap.data().members.includes(userDocRef)) {
    console.log("user already in group")
    throw new Error("You are already a member of that group")
  }

  await updateDoc(groupDocRef, {
    members: arrayUnion(userDocRef)
  })
}

export async function getUsersGroups(userId) {
  const groupsRef = collection(db, "groups")
  const userDocRef = doc(db, "users", userId)
  //Groups only contains a reference to the user, so query with doc reference to user
  const q = query(groupsRef, where("members", "array-contains", userDocRef))
  const querySnapshot = await getDocs(q)

  const groups = querySnapshot.docs.map((doc) => {
    return {...doc.data(), id: doc.id}
  })
  return groups;
}

//Follows same pattern as getUsersGroups
export async function getPostsDataByGroup(groupId) {
  const postsRef = collection(db, "posts")
  const groupRef = doc(db, "groups", groupId)
  const q = query(postsRef, where("group", "==", groupRef))
  const querySnapshot = await getDocs(q)

  //Turn references to author and group in posts into useful data
  const posts = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const authorSnap = await getDoc(doc.data().author)
      const groupSnap = await getDoc(doc.data().group)
      return {
        text: doc.data().text,
        time: doc.data().time,
        authorName: authorSnap.data().displayName,
        authorId: authorSnap.id,
        groupName: groupSnap.data().name,
        groupId: groupSnap.id,  
      }
    }))
  
  return posts;
}

export async function getUserFromFirestoreById(userId) {
  const userDocRef = doc(db, "users", userId)
  const userDocSnap = await getDoc(userDocRef)
  if (!userDocSnap.exists()) {
    return null
  }

  return {...userDocSnap.data(), id: userDocSnap.id}
}

export async function getUserFromFirestoreByRef(userRef) {
  const userDocSnap = await getDoc(userRef)
  if (!userDocSnap.exists()) {
    return null
  }

  return {...userDocSnap.data(), id: userDocSnap.id}
}

export async function getGroupById(groupId) {
  const groupDocRef = doc(db, "groups", groupId)
  const groupDocSnap = await getDoc(groupDocRef)
  if (!groupDocSnap.exists()) {
    return null
  }

  return {...groupDocSnap.data(), id: groupDocSnap.id}
}