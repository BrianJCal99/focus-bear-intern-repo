import React from "react";

type Props = {
  onClick: () => void;
};

const Child: React.FC<Props> = React.memo(({ onClick }) => {
  console.log("Child rendered");

  return (
    <div>
      <h3>Child Component</h3>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
});

export default Child;