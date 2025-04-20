import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text to summarize");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        navigate("/");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/summarize/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.data);
      } else {
        setError(data.error || "Failed to summarize text");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Text Summarizer
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Paste your text below and get an AI-powered summary instantly
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <label
              htmlFor="text-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Text
            </label>
            <textarea
              id="text-input"
              className="w-full p-4 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              rows={8}
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}

            <div className="mt-5">
              <button
                onClick={handleSummarize}
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Summarizing..." : "Summarize Text"}
              </button>
            </div>
          </div>

          {summary && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <h2 className="text-lg font-semibold mb-3 text-gray-900">
                Summary
              </h2>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-inner">
                <p className="text-gray-700 whitespace-pre-line">
                  {summary.summarized_text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
