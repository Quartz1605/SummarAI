import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthForm from './Authform'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Home'

function App() {
  
  return (
    <>
    <Router>
      <Routes>

        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />

      </Routes>

    </Router>
    </>
  )
}

export default App
