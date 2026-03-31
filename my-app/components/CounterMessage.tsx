"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCount } from "@/store/slices/counterSlice";

export default function CounterMessage() {
  const count = useAppSelector(selectCount);

  let message = "";

  if (count < 0) {
    message = "Negative value ⚠️";
  } else if (count === 0) {
    message = "Counter is at zero";
  } else if (count > 0 && count < 10) {
    message = "Positive count 👍";
  } else {
    message = "High value 🚀";
  }

  return (
    <p className="text-lg text-gray-700">
      {message}
    </p>
  );
}