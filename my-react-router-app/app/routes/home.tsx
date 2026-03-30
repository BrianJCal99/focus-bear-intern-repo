import React from "react";
import { createUser } from "api/testRequest";

const TestComponent = () => {
  const handleSubmit = async () => {
    try {
      await createUser({
        name: "John Doe",
        email: "john@example.com",
      });
    } catch (err) {
      console.error("Failed request");
    }
  };

  return (
    <button onClick={handleSubmit}>
      Create User
    </button>
  );
};

export default TestComponent;