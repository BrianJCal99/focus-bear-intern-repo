"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCount } from "@/store/slices/counterSlice";

export default function CounterDisplay() {
  const count = useAppSelector(selectCount);

  return (
    <h2 className="text-xl font-semibold">
      Current Count: {count}
    </h2>
  );
}