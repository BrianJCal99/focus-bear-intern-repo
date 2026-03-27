import React, { useCallback, useState } from "react";
import Child from "../Child";

const Parent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  // Memoized function (won’t change unless dependencies change)
  const handleClick = useCallback(() => {
    console.log("Button clicked in child");
  }, []);

  console.log("Parent rendered");

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>

      <button onClick={() => setOtherState(!otherState)}>
        Toggle Other State
      </button>

      <Child onClick={handleClick} />
    </div>
  );
};

export default Parent;