import React, { useState } from 'react';

function App() {
  const [fromDevice, setX] = useState('');
  const [toDevice, setY] = useState('');
  const [orderNum, setShapeSize] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fromDevice: fromDevice, toDevice: toDevice, orderNum: parseInt(orderNum) })
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error('Error writing data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          X:
          <input type="number" value={fromDevice} onChange={(e) => setX(e.target.value)} />
        </label>
        <br />
        <label>
          Y:
          <input type="number" value={toDevice} onChange={(e) => setY(e.target.value)} />
        </label>
        <br />
        <label>
          Shape Size:
          <input type="number" value={orderNum} onChange={(e) => setShapeSize(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;