import React from "react";
import "./Quote.css";
import deleteImg from "../../assets/free-icon-garbage-9990957.png";

function Quote({ quote, deleteQuote }) {
  return (
    <>
      <div key={quote.firebaseId} className="quote-card">
        <h1 className="quote-text">“{quote.text}”</h1>
        <p className="quote-author">— {quote.author}</p>
        <p className="quote-category">{quote.category}</p>
        <button onClick={deleteQuote} className="delete-btn">
          <img src={deleteImg} width="24px" alt="trash" />
        </button>
      </div>
    </>
  );
}

export default Quote;
