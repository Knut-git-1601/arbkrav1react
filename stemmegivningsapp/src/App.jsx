import React, { useState } from "react";
import Option from "./option"; // Importer Option-komponenten
import "./App.css"; // Importer stilene fra CSS-filen

function App() {
  const [candidates, setCandidates] = useState([]); // Tilstand for kandidater
  const [totalVotes, setTotalVotes] = useState(0); // Totalt stemmer
  const [search, setSearch] = useState(""); // Tilstand for søk
  const [history, setHistory] = useState([]); // Tilstand for stemmehistorikk

  const addCandidate = (name) => {
    if (name) {
      const newCandidate = { name, votes: 0 };
      setCandidates([...candidates, newCandidate]);
    } else {
      alert("Navn kan ikke være tomt!");
    }
  };

  const removeCandidate = (index) => {
    // Fjern kandidat
    const newCandidates = candidates.filter((_, i) => i !== index); // Filtrer ut kandidaten som skal fjernes
    setCandidates(newCandidates); // Oppdater kandidatene
    const candidateVotes = candidates[index].votes; // Antall stemmer kandidaten har
    setTotalVotes(totalVotes - candidateVotes);
    const newHistory = history.filter(
      (item) => item.name !== candidates[index].name
    );
    setHistory(newHistory);
  };

  const handleVote = (index, amount) => {
    const newCandidates = [...candidates];
    newCandidates[index].votes += amount;
    setCandidates(newCandidates);
    setTotalVotes(totalVotes + amount);

    // Oppdater historikk
    setHistory([
      ...history,
      { name: newCandidates[index].name, votes: amount },
    ]);
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
      <h1>StemmegivningsApp kommunevalg</h1>
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
