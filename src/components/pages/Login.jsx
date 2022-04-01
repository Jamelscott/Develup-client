import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Navigate } from "react-router-dom"
import "../layout/Login.css"

export default function Login({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [msg, setMessage] = useState("")

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      // post to the backend with the form data to login
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`,
        form
      )

      // decode the token that is sent to use
      const { token } = response.data
      const decoded = jwt_decode(token)

      // save the token in the localStorage
      localStorage.setItem("jwt", token)

      // set the state to the logged in user
      // console.log(decoded)
      setCurrentUser(decoded)
    } catch (err) {
      // handle errors such as wrong credentials
      if (err.response.status === 400) {
        console.log(err.response.data)
        setMessage(err.response.data.msg)
      }
      console.log(err)
    }
  }

  // navigate to the user's profile if currentUser is NOT null
  if (currentUser) return <Navigate to="/category" />
  return (
    <div className="container">
      <div className="title-Main">
        <div className="image-Container">
          <img src="/logo.png" />
        </div>
        <div className="title-Name">
          <h1>DevelUp +</h1>
        </div>
      </div>
      <div className="formContainer">
        <div className="subMain">
          <h1 className="sign-in">Sign In</h1>
          <h5 className="error-msg">{msg ? `${msg}` : ""}</h5>
        </div>

        <form onSubmit={handleFormSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
              placeholder="email"
              className="emailInput"
            />
          </div>
          <div>
            {/* Password Input */}
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
              placeholder="password"
              className="passwordInput"
            />
          </div>
          <button type="submit" className="enterButton">
            Enter
          </button>
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="a-tag">
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
