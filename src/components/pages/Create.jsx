import { useState, useEffect } from "react"
import axios from "axios"
import VisibleCards from "./VisibleCards"
import { useNavigate } from "react-router-dom"

function Create({ currentUser, setCategory, category }) {
  const [msg, setMsg] = useState("")
  const [cards, setCards] = useState([{ question: "", answer: "" }])
  const [currentCards, setCurrentCards] = useState({})
  const [newCard, setNewCard] = useState([])

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    deckName: "",
    author: currentUser.id,
    cards: [],
  })

  const refreshCategory = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/api-v1/category")
      .then((response) => {
        setCategory(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleAddCard = (question, answer) => {
    setNewCard([...newCard, { question: question, answer: answer }])
    setForm({ ...form, cards: [...form.cards, currentCards] })
  }

  const handleNewCards = (e) => {
    setForm({
      ...form,
      cards: [...form.cards, { question: currentCards.question, answer: currentCards.answer }],
    })
    setCurrentCards([])
  }

  const submitDeck = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/category`, form)
      setCategory(category)
      refreshCategory()
      navigate("/category")
    } catch (err) {
      setMsg(err.response.data.msg)
      console.log(err)
    }
  }

  return (
    <>
      {msg ? (
        <h3 className="selectDifferentName">
          Please select different deck name. That deck name already exists!
        </h3>
      ) : (
        <></>
      )}
      <div>
        <div>
          <form className="create-container-main" onSubmit={submitDeck}>
            <div className="create-container-left">
              <div>
                <label htmlFor="category-name" className="createLabel">
                  Category
                </label>
              </div>
              <div>
                <input
                  required
                  type="text"
                  placeholder="category name.."
                  id="category-name"
                  value={form.categoryName}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="deck-name" className="createLabel">
                  Deck name
                </label>
              </div>
              <div>
                <input
                  required
                  type="text"
                  placeholder="deck name.."
                  id="deck-name"
                  value={form.deckName}
                  onChange={(e) => setForm({ ...form, deckName: e.target.value })}
                />
              </div>
              <div>
                <input className="submit-deck" type="submit" value="Create deck" />
              </div>
              <div className="create-card-div">
                <label hidden htmlFor="card-question">
                  Card 1
                </label>
                <div>
                  <input
                    className="create-question-input"
                    required
                    type="text"
                    placeholder="Question.."
                    id="card-question"
                    name="question"
                    value={currentCards.question}
                    onChange={(e) =>
                      setCurrentCards({
                        ...currentCards,
                        question: e.target.value,
                      })
                    }
                  />
                  <input
                    required
                    className="create-answer-input"
                    type="text"
                    placeholder="Answer.."
                    id="card-answer"
                    name="answer"
                    value={currentCards.answer}
                    onChange={(e) => setCurrentCards({ ...currentCards, answer: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    className="add-card"
                    type="button"
                    value="add a card"
                    onClick={() => handleAddCard(currentCards.question, currentCards.answer)}
                  />
                </div>
              </div>
            </div>
            <div className="create-container-right">
              <VisibleCards
                currentCards={currentCards}
                cards={cards}
                handleNewCards={handleNewCards}
                newCard={newCard}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Create
