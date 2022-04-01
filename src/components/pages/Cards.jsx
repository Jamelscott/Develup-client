import { useState, useEffect } from "react"
import { useParams, useNavigate, Navigate } from "react-router-dom"
import EditDeck from "./EditDeck"
import axios from "axios"

export default function Cards({ category, setCategory, currentUser }) {
  const { id, deckId } = useParams()
  const [deckData, setDeckData] = useState({
    cards: [],
  })
  const [showForm, setShowForm] = useState(false)
  const [num, setNum] = useState(0)
  const [answer, setAnswer] = useState("")
  const [flip, setFlip] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api-v1/category/${id}/deck/${deckId}`)
      .then((response) => {
        setDeckData(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [showForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/category/${id}/deck/${deckId}`, category)
      .then((response) => {
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api-v1/category")
      })
      .then((response) => {
        setCategory(response.data)
        navigate("/category")
      })
      .catch(console.log)
  }

  const toggleDisplay = () => {
    setFlip(!flip)
  }

  const handleAddNum = () => {
    setFlip(false)
    setAnswer("")
    if (num >= deckData.cards.length - 1) {
      setNum(0)
    } else {
      setNum(num + 1)
    }
  }
  console.log(deckData.cards[num])

  return (
    <div className="card-master-container">
      <div style={{ position: "relative" }} className="card-container">
        <h1
          style={{
            position: "absolute",
            left: "20px",
            top: "20px",
            color: "white",
            textShadow: "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
          }}
        >
          {deckData.deckName}
        </h1>
        <h1
          style={{
            position: "absolute",
            right: "20px",
            top: "10px",
            color: "white",
            textShadow: "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
          }}
        >
          <p>
            {num + 1}/{deckData.cards.length}
          </p>
        </h1>
        <div>
          <div className="card-question-container">
            <p>
              {deckData.cards[num] === undefined ? "This is empty" : deckData.cards[num].question}
            </p>
          </div>
          <div className="card-user-answer">
            <input
              style={{ width: "500px", height: "50px", textAlign: "center" }}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></input>
          </div>
        </div>

        {flip ? (
          <div className="card-answer-container">
            <p className="question-text">
              {deckData.cards[num] === undefined ? "This is empty" : deckData.cards[num].answer}
            </p>
          </div>
        ) : (
          <div className="card-answer-ghost"></div>
        )}

        <div className="button-container">
          {!flip ? (
            <button className="card-buttons" onClick={toggleDisplay}>
              Show Answer
            </button>
          ) : (
            <button className="card-buttons" onClick={toggleDisplay}>
              Hide Answer
            </button>
          )}
          <br></br>
          <button className="card-buttons-next" onClick={handleAddNum}>
            Next Card
          </button>
        </div>
      </div>
      {currentUser.id === deckData.author ? (
        <div className="deck-admin-tools">
          <p>Deck Author Tools 🛠</p>
          <button className="edit-button" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Return" : "Edit Deck"}
          </button>
          <br></br>
          <button className="delete-button" onClick={handleSubmit}>
            Delete Deck
          </button>{" "}
        </div>
      ) : (
        <></>
      )}

      {showForm ? (
        <EditDeck
          categoryId={id}
          decksId={deckId}
          category={category}
          setShowForm={setShowForm}
          showForm={showForm}
          deckData={deckData}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
