import React, { useMemo, useState } from "react";

const ExpensiveList: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  // Generate a large list
  const numbers: number[] = useMemo(
    () => Array.from({ length: 10000 }, (_, i) => i + 1),
    []
  );

  // Expensive calculation
  const computedValues: number[] = useMemo(() => {
    console.log("Running expensive calculation...");

    return numbers.map((num) => {
      let result = 0;

      for (let i = 0; i < 1000; i++) {
        result += num * multiplier;
      }

      return result;
    });
  }, [numbers, multiplier]);

  return (
    <div>
      <h2>Expensive List</h2>

      <button onClick={() => setCount((prev) => prev + 1)}>
        Re-render (count: {count})
      </button>

      <button onClick={() => setMultiplier((prev) => prev + 1)}>
        Change Multiplier ({multiplier})
      </button>

      <ul style={{ height: "300px", overflow: "auto" }}>
        {computedValues.slice(0, 100).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensiveList;