import React, { useState } from "react";

const TestCard = () => {
  const [inputValue, setInputValue] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");
  let debounceTimer: NodeJS.Timeout;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    clearTimeout(debounceTimer); // Clear previous debounce timer
    debounceTimer = setTimeout(async () => {
      if (value.trim() !== "") {
        try {
          const response = await fetch(
            `/api/test?input=${encodeURIComponent(value)}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch addresses");
          }
          const data = await response.json();
          setAddresses(data.predictions);
          setError("");
        } catch (error) {
          console.error("Error fetching addresses:", error);
          setError("Failed to fetch addresses. Please try again later.");
          setAddresses([]);
        }
      } else {
        setAddresses([]);
        setError("");
      }
    }, 500); // Debounce time: 500 milliseconds
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {addresses.map((address: any) => (
          <li key={address.place_id}>{address.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestCard;
