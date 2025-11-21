import React from "react";
import "./Quote.css";

function Quote({ quote, editQuote }) {
  return (
    <>
      <div key={quote.firebaseId} className="quote-card">
        <h1 className="quote-text">“{quote.text}”</h1>
        <p className="quote-author">— {quote.author}</p>
        <p className="quote-category">{quote.category}</p>
      </div>
    </>
  );
}

export default Quote;
