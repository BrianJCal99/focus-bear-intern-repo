"use client";

import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "@/store/slices/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold">Counter: {count}</h1>

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

        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          +5
        </button>

        <button
          onClick={() => dispatch(reset())}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}