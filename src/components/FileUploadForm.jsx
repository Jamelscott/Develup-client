import axios from "axios"
import { useState } from "react"
import "./layout/profile.css"

export default function FileUploadForm({ currentUser, setDisplayImg }) {
  const [formImg, setFormImg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("jwt")
      const options = {
        headers: {
          Authorization: token,
        },
      }
      const fd = new FormData()
      fd.append("image", formImg)
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/images`, fd, options)

      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/`)
      const foundUser = response.data.find((user) => {
        return user._id === currentUser.id
      })

      setDisplayImg(
        `https://res.cloudinary.com/solful/image/upload/c_thumb,g_face,h_300,w_300/${foundUser.avatar}.png`
      )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <br></br>
      <h4>Upload an Avatar</h4>
      <form onSubmit={handleSubmit} encType="multipart/form">
        <label htmlFor="image"></label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => setFormImg(e.target.files[0])}
        />
        <br></br>
        <input className="submitButton" type="submit" />
      </form>
    </>
  )
}
