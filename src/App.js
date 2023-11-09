import React, { useState } from 'react';
import './App.css';

function App() {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState({
    years: null,
    months: null,
    days: null,
  });
  const [error, setError] = useState('');

  const calculateAge = () => {
    const birthDate = new Date(dob);

    if (isNaN(birthDate)) {
      setError('Invalid date format. Please use yyyy-mm-dd.');
      setAge({
        years: null,
        months: null,
        days: null,
      });
    } else {
      setError('');
      const today = new Date();
      const ageInMilliseconds = today - birthDate;

      const years = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
      const days = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));

      setAge({
        years,
        months,
        days,
      });
    }
  };

  return (
    <div className="App">
      <h1>Age Calculator</h1>
      <label htmlFor="dob">Enter Your Date of Birth:</label>
      <input
        type="date"
        id="dob"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <button onClick={calculateAge}>Calculate</button>
      {error && <p className="error">{error}</p>}
      {age.years !== null && !error && (
        <p>You are {age.years} years, {age.months} months, and {age.days} days old.</p>
      )}
    </div>
  );
}

export default App;
