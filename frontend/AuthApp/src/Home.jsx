import { useNavigate } from "react-router-dom"; 
import { useState } from "react";

const Home = () => {

  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    try{

      const access_token = localStorage.getItem("access_token")
      const response = await fetch('http://127.0.0.1:8000/summarize/',{
        "method" : "POST",
        "headers" : {
          "Content-type" : "application/json",
          "Authorization" : `Bearer ${access_token}`
        },
        "body" : JSON.stringify({
          'text' : text
        })

      })

      const data = response.json()

      if(response.ok){
        console.log(data.message)
      }
      else{
        console.log()
      }




    }catch(error){

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Text Summarizer</h1>
      
      <textarea
        className="w-full max-w-2xl p-4 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={8}
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Summarize
      </button>

      {summary && (
        <div className="mt-6 w-full max-w-2xl bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Summarized Text:</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );

}

export default Home