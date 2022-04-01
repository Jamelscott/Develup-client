import { useState } from "react"
import axios from "axios"

function EditDeck({ decksId, categoryId, setShowForm, showForm, deckData }) {
  const [editForm, setEditForm] = useState(deckData)
  const [editCard, setEditCard] = useState(deckData.cards)

  const handleOnClick = (e) => {
    const finalForm = { deckName: editForm.deckName }
    finalForm.cards = editCard

    e.preventDefault()
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/category/${categoryId}/deck/${decksId}`,
        finalForm
      )
      .then((response) => {
        setShowForm(!showForm)
        return axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/category/${categoryId}/deck/${decksId}`
        )
      })
      .catch(console.log)
  }

  let deckEdit = deckData.cards.map((card, idx) => {
    const handleCardQuestion = (e) => {
      const newDeck = [...editCard]
      newDeck[idx].question = e.target.value
      setEditCard(newDeck)
    }
    const handleCardAnswer = (e) => {
      const newDeck = [...editCard]
      newDeck[idx].answer = e.target.value
      setEditCard(newDeck)
    }
    return (
      <div className="card-edit-container" key={`decks-${idx}`}>
        <h2>Card {idx + 1}</h2>
        <label htmlFor="question">Question:</label>
        <textarea
          type="text"
          className="card-question-edit-container"
          placeholder="Question"
          value={editCard[idx].question}
          id="question"
          onChange={handleCardQuestion}
        />

        <label htmlFor="answer">Answer</label>
        <textarea
          className="card-answer-edit-container"
          type="text"
          placeholder="Answer"
          value={editCard[idx].answer}
          id="answer"
          onChange={handleCardAnswer}
        />
      </div>
    )
  })

  return (
    <>
      <br></br>
      {/* <h3>Edit Cards Below</h3> */}
      <form onSubmit={handleOnClick}>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
          <div className="deck-name-edit">
            <label htmlFor="deckName">Edit Deck Name</label>
            <input
              type="text"
              value={editForm.deckName}
              onChange={(e) => setEditForm({ ...editForm, deckName: e.target.value })}
              id="deckName"
            />
          </div>
          <input className="card-edit-submit" type="submit" />
        </div>

        {deckEdit}
      </form>
    </>
  )
}

export default EditDeck
