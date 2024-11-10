import React from "react";
import PropTypes from "prop-types";
import "./App.css";

function Option({ candidate, onIncrease, onDecrease, onRemove, onEdit }) {
  return (
    <div className="candidate">
      <h3>{candidate.name}</h3>
      <div className="button-group">
        <button className="increase-button" onClick={onIncrease}>
          Øk
        </button>
        <button
          className="decrease-button"
          onClick={onDecrease}
          disabled={candidate.votes <= 0} // Deaktiverer når stemmer er 0
        >
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

Option.propTypes = {
  candidate: PropTypes.shape({
    name: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Option;
