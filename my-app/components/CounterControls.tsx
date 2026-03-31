"use client";

import { useAppDispatch } from "@/store/hooks";
import { increment, decrement } from "@/store/slices/counterSlice";

export default function CounterControls() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => dispatch(increment())}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        +
      </button>

      <button
        onClick={() => dispatch(decrement())}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        -
      </button>
    </div>
  );
}