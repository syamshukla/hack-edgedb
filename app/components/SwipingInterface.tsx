"use client";

import { useState, useEffect } from "react";

export default function SwipingInterface() {
  const [schemas, setSchemas] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSchemas = async () => {
      const response = await fetch("/api/get-schemas");
      const data = await response.json();
      setSchemas(data.schemas);
    };
    fetchSchemas();
  }, []);

  const handleSwipe = async (direction: string) => {
    if (currentIndex >= schemas.length) return;

    const schema = schemas[currentIndex];
    const roastText = prompt("Enter your roast/compliment:");

    if (roastText) {
      await fetch("/api/submit-roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: roastText,
          schema_id: schema.id,
          username: "your-username", // Replace with actual user authentication logic
        }),
      });
    }

    setCurrentIndex(currentIndex + 1);
  };

  if (currentIndex >= schemas.length) {
    return <div>No more schemas to swipe!</div>;
  }

  const currentSchema = schemas[currentIndex];

  return (
    <div>
      <div>{currentSchema.text}</div>
      <button onClick={() => handleSwipe("roast")}>Roast</button>
      <button onClick={() => handleSwipe("compliment")}>Compliment</button>
    </div>
  );
}
