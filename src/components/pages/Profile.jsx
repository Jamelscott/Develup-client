import { useState, useEffect } from "react"
import FileUploadForm from "../FileUploadForm"
import axios from "axios"
import "../layout/profile.css"

export default function Profile({ currentUser, users }) {
  const [displayImg, setDisplayImg] = useState("")

  // let foundUser = users.find((user) => {
  //   return  user._id === currentUser.id
  // })
  // console.log(users)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}`)
      .then((response) => {
        setDisplayImg(
          `https://res.cloudinary.com/solful/image/upload/c_thumb,g_face,h_300,w_300/${response.data.avatar}.png`
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="center">
      <h1>{currentUser.name}'s Profile</h1>
      {displayImg ===
      `https://res.cloudinary.com/solful/image/upload/c_thumb,g_face,h_300,w_300/undefined.png` ? (
        "No Profile Picture"
      ) : (
        <img className="img" src={displayImg} alt="Profile picture" />
      )}

      <h2>
        {currentUser.name}
        <br></br>
        {currentUser.email}
      </h2>

      <FileUploadForm currentUser={currentUser} setDisplayImg={setDisplayImg} />

      <h1 className="spacing"> COMING SOON!</h1>
      <h3>Favorite Decks</h3>

      <img src="images/mongodb-card.png" alt="Node-card" width="350px" height="220px" />
      <img src="images/node-card.png" alt="Node-card" width="350px" height="220px" />
    </div>
  )
}
