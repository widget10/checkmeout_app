import React, { useState } from 'react';

function Checkout() {
  const [skus, setSkus] = useState('');
  const [total, setTotal] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skus }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid input');
      }
      
      const data = await response.json();
      setTotal(data.total);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTotal(null);
    }
  };

  return (
    <div className="checkout">
      <h2>Supermarket Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={skus}
          onChange={(e) => setSkus(e.target.value)}
          placeholder="Enter SKUs (e.g., ABCD)"
        />
        <button type="submit">Calculate Total</button>
      </form>
      {error && <p className="error">{error}</p>}
      {total !== null && <p className="total">Total: £{total}</p>}
    </div>
  );
}

export default Checkout;