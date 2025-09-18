import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();

  const goToUsers = () => {
    navigate('/users');
  };

  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="App">
      <h1>Welcome App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name: &nbsp;
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        &nbsp;
        <button type="submit">Submit</button>
      </form>

      {submitted && <h2>Hello {name}! Welcome to my app</h2>}

      <div style={{ padding: '20px' }}>
        <h1>Welcome to the App</h1>
        <button onClick={goToUsers}>Go to User Page</button>
      </div>
    </div>
    
  );
}

export default Home;
