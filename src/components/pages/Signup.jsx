import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Navigate } from "react-router-dom"
import "../layout/register.css"

export default function Register({ currentUser, setCurrentUser, setUsers, users }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirmation: "",
  })
  const [msg, setMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (form.password === form.passwordConfirmation) {
        // remove unneeded data in the form pre-request
        delete form.passwordConfirmation
        // do the axios since the passwords match
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`,
          form
        )
        // get the token from the response
        const { token } = response.data
        // set the token in local storage
        localStorage.setItem("jwt", token)
        // decode the token
        const decoded = jwt_decode(token)
        // log the user in
        setCurrentUser(decoded)
        const response2 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users`)
        setUsers(response2.data)
      } else {
        setMsg("The two passwords you entered do not match 🥴")
      }
    } catch (err) {
      if (err.response.status === 409) {
        setMsg(err.response.data.msg)
      }
      console.log(err)
    }
  }

  // navigate away if the user logs in
  if (currentUser) return <Navigate to="/category" />

  return (
    <div className="container">
      <div className="title-MainRegister">
        <div className="image-Container">
          <img src="/logo.png" />
        </div>
        <div className="title-Name">
          <h1>DevelUp +</h1>
        </div>
      </div>
      <div className="formRegisterContainer">
        <div className="subMain">
          <h1 className="sign-in">Register</h1>
          <h5 className="error-msg">{msg ? `${msg}` : ""}</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email"
              className="emailInputRegister"
            />
          </div>

          <div>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="name"
              className="nameInputRegister"
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="password"
              className="passwordInputRegister"
            />
          </div>

          <div>
            <input
              type="password"
              id="passwordConfirmationRegister"
              value={form.passwordConfirmation}
              onChange={(e) => setForm({ ...form, passwordConfirmation: e.target.value })}
              placeholder="password confirmation"
              className="passwordInputConfirmationRegister"
            />
          </div>

          <div className="center">
            <input type="submit" className="enterButtonRegister" value="Sign up" />
            <p>
              Already have an account?{" "}
              <a href="/" className="a-tag">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
