import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'

import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Profile from './components/pages/Profile'
import Category from './components/pages/Category'
import Error from './components/pages/Error'
import Decks from './components/pages/Decks'
import Navbar from './components/layout/Navbar'
import About from './components/pages/About'
import Create from './components/pages/Create'
import Cards from './components/pages/Cards'
import axios from 'axios';

function App() {
  // state with the user data when the user is logged in  
  // useState is null because there is no logged in user yet.
const [currentUser, setCurrentUser] = useState(null)
const [users, setUsers] = useState('')
const [category, setCategory] = useState([])


// useEffect to get all of the categories from the backend
useEffect(() => {
  axios.get(process.env.REACT_APP_SERVER_URL + "/api-v1/category")
    .then((response) => {
      setCategory(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}, [])

  // useEffect that handles localstorage if the user navigates away from the page or refreshes
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    // if a token is found -> Log the user in OTHERWISE make sure they are logged out
    if (token) {
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/`)
    .then(response => {
      setUsers(response.data)
    })
    .catch(console.log)
  }, [])
  
  
//Logout handler function that deletes a token from the localstorage
const handleLogout = () => {
  // remove the token from the localstorage
  if (localStorage.getItem('jwt')) localStorage.removeItem('jwt');
  // set the userState to be null so that user is logged out
  setCurrentUser(null)
}
  return (
    <Router>
      <Navbar currentUser={currentUser} handleLogout={handleLogout} users={users}/>
      <div>
      <Routes>
          {/* PATH to landing page (Landing page will be the login page) */}
          <Route 
            path="/about"
            element={<About/>}
          />

          <Route 
            path="/"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
          />

          {/* Path TO REGISTER */}
          <Route 
            path='/signup'
            element={<Signup currentUser={currentUser} setCurrentUser={setCurrentUser} setUsers={setUsers} />}
          />

          {/* Path TO CATEGORIES */}
          <Route 
            path='/category'
            element={currentUser ? <Category category={category} /> : <Navigate to="/" />}
          />

          <Route 
            path="/create-deck"
            element={currentUser ? <Create currentUser={currentUser} setCategory={setCategory} category={category}/> : <Navigate to="/" />}
          />

          {/* Path to DECK */}
          <Route 
            path='/category/:id/'
            element={currentUser ? <Decks category={category} setCategory={setCategory} currentUser={currentUser} users={users}/>: <Navigate to="/" /> }
          />
          
          {/* Path to CARDS */}
          <Route 
            path='/category/:id/deck/:deckId'
            element={currentUser ? <Cards category={category} setCategory={setCategory} currentUser={currentUser}/>: <Navigate to="/" /> }
          />


          {/* Path TO USER'S PROFILE */}
          <Route 
            path="/profile"
            element={currentUser ? <Profile  currentUser={currentUser} setUsers={setUsers} users={users} category={category} setCategory={setCategory} /> : <Navigate to="/" />}
            
          />

          <Route 
            path="*"
            element={<Error />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
