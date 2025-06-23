import React, { useState } from "react";

const Home = () => {
  const [advice, setAdvice] = useState("Do nothing be nothing");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getRandomAdvice = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center  min-h-screen bg-orange-900 text-white gap-4">
      <h1 className="mt-12">Get a Random Advice</h1>
      <h1 className="text-2xl font-bold text-center">
        {error ? "something went wrong. Please Try again" : advice}
      </h1>
      <button
        onClick={getRandomAdvice}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-gray-800 cursor-pointer"
      >
        {loading ? "Loading..." : "Get Advice"}
      </button>
    </div>
  );
};

export default Home;
