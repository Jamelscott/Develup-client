import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"

export default function Deck({ category, users, setCurrentCategory }) {
  const { id } = useParams()

  let deckIdx = category.findIndex((object) => {
    return object._id === id
  })
  let showAllDecks
  useEffect(() => {

    setCurrentCategory(`${category[deckIdx].name} decks`)
  }, [])
  if (deckIdx != -1) {
    showAllDecks = category[deckIdx].decks.map((deck, i) => {
      let userIdx = users.findIndex((object) => {
        return object._id === deck.author
      })



      return (
        <div key={`link-link${i}`}>
          <Link
            key={`link-link${i}`}
            to={`/category/${id}/deck/${deck._id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="deck-div" key={`category-link${i}`}>
              <div key={`deckName-Div-link${i}`}>
                <p key={`deckName-link${i}`} className="category-text">
                  {deck.deckName}
                </p>

                <div className="category-text-small">
                  {deck.cards.length < 2 ? (
                    <p style={{ margin: 0 }}>{deck.cards.length} Card</p>
                  ) : (
                    <p style={{ margin: 0 }}>{deck.cards.length} Cards</p>
                  )}{" "}
                </div>
                <p style={{ margin: 0 }} className="category-text-small">
                  Author: {users[userIdx] ? users[userIdx].name : "Still loading..."}
                </p>
              </div>
            </div>
          </Link>
        </div>
      )
    })
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <div className="category-container">{showAllDecks}</div>
    </div>
  )
}
