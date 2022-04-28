import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Category({ category, setCurrentCategory }) {
  const categoryLinks = category.map((category, i) => {
    return (
      <Link
        key={`link${i}`}
        to={`/category/${category._id}`}
        style={{ textDecoration: 'none' }}
      >
        <div className="category-div" key={`category-link${i}`}>
          <p style={{padding: 0}}key={`category-name-${i}`} className="category-text">
            {category.name}
          </p>
          <div key={`deck-number-${i}`} className="category-text-small">
            {category.decks.length < 2 ? <p style={{padding: 0, margin: 0}}> {category.decks.length} deck</p> : <p style={{padding: 0, margin:0}}> {category.decks.length} decks</p>}
          </div>
        </div>
      </Link>
    );
  });

  useEffect(() => {

    setCurrentCategory("Select a Category")
  }, [])

  return (
    <div style={{ textAlign: 'center',marginTop:"30px" }}>
      <div className="category-container">{categoryLinks}</div>
    </div>
  );
}
