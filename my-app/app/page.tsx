import CounterDisplay from "@/components/CounterDisplay";
import CounterControls from "@/components/CounterControls";
import CounterMessage from "@/components/CounterMessage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <CounterDisplay />
      <CounterMessage />
      <CounterControls />
    </main>
  );
}