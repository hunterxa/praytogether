import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Layout from './layouts/Layout'
import Landing, { loader as landingLoader } from './pages/Landing'
import SignUp from './pages/SignUp'
import SignUpForm, { loader as signUpLoader, action as signUpAction } from './components/SignUpForm'
import Login, { loader as loginLoader, action as loginAction } from './pages/Login'
import Logout, { loader as logoutLoader } from './components/Logout'
import NotFound from './pages/NotFound'
import UserHome, { loader as homeLoader } from './pages/user/UserHome'
import UserProfile, { loader as profileLoader } from './pages/user/UserProfile'
import GroupsLayout from './layouts/GroupsLayout'
import Groups, { loader as groupsLoader } from './pages/user/Groups'
import GroupPosts, { loader as groupPostsLoader } from './pages/user/GroupPosts'
import CreateGroup, {loader as createGroupLoader, action as createGroupAction} from './pages/user/CreateGroup'
import Error from './components/Error'

import './App.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route 
      index 
      loader={landingLoader}
      element={<Landing />} 
    />
    <Route 
      path="signup"
      element={<SignUp />} 
    >
      <Route 
        index
        loader={signUpLoader}
        action={signUpAction}
        element={<SignUpForm />}
      />
    </Route>
    <Route 
      path="login" 
      loader={loginLoader}
      action={loginAction}
      element={<Login />}
    />

    <Route
      path="home"
      loader={homeLoader}
      element={<UserHome />}
    />
    <Route
      path="groups"
      element={<GroupsLayout />}
    >
      <Route
        index
        loader={groupsLoader}
        element={<Groups />}
      />
      <Route
        path="create"
        loader={createGroupLoader}
        action={createGroupAction}
        element={<CreateGroup />}
      />
      <Route
        path=":groupId"
      >
        <Route 
          index
          loader={groupPostsLoader}
          element={<GroupPosts />}
        />
        <Route
          path="post"
          element={<h1>Create a post here</h1>}
        />
      </Route>
      <Route
        path="join"
        element={<h1>Join a group</h1>}
      />
    </Route>
    <Route 
      path="profile" 
      loader={profileLoader}
      element={<UserProfile />} 
      errorElement={<Error />}
    />
    
    <Route 
      path="logout"
      loader={logoutLoader}
      element={<Logout />}
    />

    {/* Catch all route - displays "Page not found" page*/}
    <Route path="*" element={<NotFound />} />
  </Route>
))

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
