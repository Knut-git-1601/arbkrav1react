import React from "react";
import "./App.css"; // Bruker samme stilfil

function Option({ candidate, onIncrease, onDecrease, onRemove, onEdit }) {
  return (
    <div className="candidate"> 
      <h3>{candidate.name}</h3> 
      <div className="button-group">
        <button className="increase-button" onClick={onIncrease}>
          Øk
        </button>
        <button className="decrease-button" onClick={onDecrease}>
          Reduser
        </button>
        <button className="remove-button" onClick={onRemove}>
          Fjern kandidat
        </button>
        <button className="edit-button" onClick={onEdit}>
          Rediger navn
        </button>
      </div>
      <p>Stemmer: {candidate.votes}</p>
    </div>
  );
}

export default Option;
