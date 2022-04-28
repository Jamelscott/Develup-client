import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as MdIcons from "react-icons/md"
import * as IoIcons from 'react-icons/io';
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { SidebarData } from "./SidebarData"
import "./navbar.css"

function Navbar({ currentUser, handleLogout, category, currentCategory}) {
  const [sidebar, setsidebar] = useState(false)

  const showSidebar = () => {
    setsidebar(!sidebar)
  }
  // if the user is logged in
  const loggedIn = (
    <>
      <li key={"navbar-last"} style={{ backgroundColor: "#4B5869" }} className={"nav-text"}>
        <Link to="/">
          <AiIcons.AiOutlineLogout />
          <span onClick={handleLogout}>Logout</span>
        </Link>
      </li>
    </>
  )

  // if the user is logged out
  const loggedOut = (
    <>
      <li key={"navbar-last"} style={{ backgroundColor: "#4B5869" }} className={"nav-text"}>
        <Link to="/">
          <AiIcons.AiOutlineLogout />
          <span>Login</span>
        </Link>
      </li>
      <li key={"navbar-lasting"} style={{ backgroundColor: "#4B5869" }} className={"nav-text"}>
        <Link to="/signup">
          <IoIcons.IoIosArrowUp />
          <span>Sign Up</span>
        </Link>
      </li>
    </>
  )
  console.log(currentCategory)

  return (
    <div style={{zIndex: "10"}}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars style={{ color: "white" }} onClick={showSidebar} />
        </Link>
    <div><h3 className="centerText">{!currentCategory ? <></> : currentCategory}</h3></div>
        <div style={{display: "flex", flexDirection:"row", width:"250px", justifyContent:"flex-end"}}>

      <img alt="user" style={{ height: "40px", width: "40px", margin: "0" }} src="./logo.png"></img>
          <h2 style={{color: "white", padding: "0 20px 0 20px"}}>DevelUp +</h2>

        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <MdIcons.MdOutlineKeyboardReturn style={{ color: "white" }} />
            </Link>
          </li>
          <li className="nav-text-nohover">
     <img alt="user" style={{ height: "40px", width: "40px", margin: "0" }} src="./logo.png"></img>
            {currentUser ? (
              <p className="nav-text">Hello, {currentUser.name}!</p>
            ) : (
              <p className="nav-text">Please Log-in</p>
            )}
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li
                key={`navbar-${index}`}
                style={{ backgroundColor: `${item.background}` }}
                className={item.cName}
              >
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
          {currentUser ? loggedIn : loggedOut}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
