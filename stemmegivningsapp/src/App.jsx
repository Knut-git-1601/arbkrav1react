import React, { useState } from "react";
import Option from "./Option";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);

  const addCandidate = (name) => {
    if (name) {
      const newCandidate = { name, votes: 0 };
      setCandidates([...candidates, newCandidate]);
    } else {
      alert("Navn kan ikke være tomt!");
    }
  };

  const removeCandidate = (index) => {
    const newCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(newCandidates);
    const candidateVotes = candidates[index].votes;
    setTotalVotes(totalVotes - candidateVotes);
    const newHistory = history.filter(
      (item) => item.name !== candidates[index].name
    );
    setHistory(newHistory);
  };

  const handleVote = (index, amount) => {
    const newCandidates = [...candidates];
    if (newCandidates[index].votes + amount >= 0) {
      // Hindrer negative stemmer
      newCandidates[index].votes += amount;
      setCandidates(newCandidates);
      setTotalVotes(totalVotes + amount);
      setHistory([
        ...history,
        { name: newCandidates[index].name, votes: amount },
      ]);
    }
  };

  const editCandidateName = (index) => {
    const newName = prompt("Oppgi nytt navn:", candidates[index].name);
    if (newName) {
      const newCandidates = [...candidates];
      newCandidates[index].name = newName;
      setCandidates(newCandidates);
    }
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Stemmegivningsapp</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Søk etter kandidat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="add-button"
        onClick={() => addCandidate(prompt("Navn på ny kandidat:"))}
      >
        Legg til kandidat
      </button>
      {filteredCandidates.map((candidate, index) => (
        <Option
          key={index}
          candidate={candidate}
          onIncrease={() => handleVote(index, 1)}
          onDecrease={() => handleVote(index, -1)}
          onRemove={() => removeCandidate(index)}
          onEdit={() => editCandidateName(index)}
        />
      ))}
      <h2>Totale stemmer: {totalVotes}</h2>
      <h2>Historikk:</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.name}: {entry.votes > 0 ? `+${entry.votes}` : entry.votes}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
