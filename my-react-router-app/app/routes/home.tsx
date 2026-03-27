import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
};

const DataFetcher: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Component mounted");

    // Cleanup function
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const controller = new AbortController();

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        { signal: controller.signal }
      );
      const result = await response.json();
      setData(result.slice(0, 5)); // limit results
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Fetch error:", error);
      }
    } finally {
      setLoading(false);
    }

    // Cleanup for this fetch request
    return () => {
      controller.abort();
    };
  };

  return (
    <div>
      <h2>Data Fetcher</h2>

      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;