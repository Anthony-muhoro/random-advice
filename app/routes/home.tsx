import React, { useState, useEffect} from "react";
import { Button } from "~/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

const Home = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
    useEffect(() => {
      setLoading(false)
    getRandomAdvice();
  }, []);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-xl w-full space-y-6 border border-gray-200">
        <h1 className=" flex justify-center items-center text-3xl font-bold text-center text-gray-800 gap-3">
          <img src="/logo.svg" alt="ThinIt" /> Get Random Advice
        </h1>

        {error ? (
          <Alert
            variant="destructive"
            className="bg-red-100 border-red-400 text-red-800"
          >
            <AlertCircle className="h-5 w-5" />
            
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center text-lg font-medium text-gray-700 min-h-[120px] flex items-center justify-center">
            {advice}
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={getRandomAdvice}
            disabled={loading}
            className="px-8 py-4 text-lg cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-white" />
                Loading...
              </>
            ) : (
              "Get Advice"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
