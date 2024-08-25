import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState(''); // JSON input from the user
  const [responseData, setResponseData] = useState(null); // API response data
  const [selectedOptions, setSelectedOptions] = useState([]); // Options selected from the multi-select dropdown
  const [error, setError] = useState(null); // Error message

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput); // Parse JSON input

      // Make a POST request to the Django API
      const response = await fetch('http://localhost:8000/bfhl/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parsedInput.data })
      });
      
      // Fetch and set the response data
      const data = await response.json();
      setResponseData(data);
      setError(null);
    } catch (error) {
      setError("Invalid JSON input! Please enter valid JSON.");
      console.error("Invalid JSON or error:", error);
    }
  };

  const handleOptionChange = (option) => {
    // Toggle selected options
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((o) => o !== option)
        : [...prevOptions, option]
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>21BRS1359</h1>
      
      {/* JSON Input Area */}
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here, e.g., {"data": ["A", "1", "b"]}'
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render API Response */}
      {responseData && (
        <div>
          <h3>Response Data:</h3>
          {selectedOptions.includes('Alphabets') && (
            <p>Alphabets: {responseData.alphabets.join(', ')}</p>
          )}
          {selectedOptions.includes('Numbers') && (
            <p>Numbers: {responseData.numbers.join(', ')}</p>
          )}
          {selectedOptions.includes('Highest lowercase alphabet') && (
            <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>
          )}
        </div>
      )}

      {/* Multi-Select Dropdown */}
      <div>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={() => handleOptionChange('Alphabets')}
          />
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={() => handleOptionChange('Numbers')}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest lowercase alphabet"
            onChange={() => handleOptionChange('Highest lowercase alphabet')}
          />
          Highest Lowercase Alphabet
        </label>
      </div>
    </div>
  );
}

export default App;
