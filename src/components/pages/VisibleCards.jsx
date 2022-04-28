
function VisibleCards({ currentCards, setCurrentCards, cards, newCard }) {
  const cardsArray = newCard.slice(0).reverse().map((element, index) => {
    return (
      <div className="create-card-div" key={`element-${index}`}>
        <label hidden htmlFor="card-question">
          Card {index +1}
        </label>
        <div>
          <h5>Question</h5>
          <input
            className="create-question-input"
            required
            style={{resize: "none"}}
            type="text"
            placeholder="Question.."
            id="card-question"
            name="question"
            value={element.question}
          />
          <h5>Answer</h5>
          <textarea
            required
            style={{resize: "none"}}
            className="create-answer-input"
            type="text"
            placeholder="Answer.."
            id="card-answer"
            name="answer"
            value={element.answer}
          />
        </div>
      </div>
    )
  })

  return <div className="create-ghost-right">{cardsArray}</div>
}

export default VisibleCards
