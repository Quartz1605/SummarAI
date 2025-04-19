import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister
      ? 'http://127.0.0.1:8000/auth/register/'
      : 'http://127.0.0.1:8000/auth/login/'; 

      const bodyData = isRegister
      ? formData
      : {
          username: formData.username,
          password: formData.password,
        };

    try {
      console.log(bodyData)
      const response = await fetch(url,{
        "method" : 'POST',
        "headers" : {
          "Content-type" : "application/json"
        },
        "body" : JSON.stringify(bodyData)

      })

      const data = await response.json()
      if(response.ok){
        if (!isRegister) {
          
          localStorage.setItem('access_token', data.access);
          navigate("home/")
        }
        alert(isRegister ? 'Registered Successfully!' : 'Logged in Successfully!');
        console.log(data);
      } else {
        alert('Error: ' + JSON.stringify(data));
      }
      
     
      
    } catch (error) {
      console.log(error)
      
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 rounded-l-xl text-white font-semibold ${
              isRegister ? 'bg-gray-400' : 'bg-blue-600'
            }`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-r-xl text-white font-semibold ${
              isRegister ? 'bg-blue-600' : 'bg-gray-400'
            }`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            placeholder="Username"
            className="w-full p-3 border rounded-xl"
            required
          />

          {isRegister && (
            <>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
                className="w-full p-3 border rounded-xl"
                required
              />
              <input
                type="text"
                name="age"
                onChange={handleChange}
                value={formData.age}
                placeholder="Age"
                className="w-full p-3 border rounded-xl"
              />
              <input
                type="text"
                name="phone_number"
                onChange={handleChange}
                value={formData.phone_number}
                placeholder="Phone Number"
                className="w-full p-3 border rounded-xl"
              />
            </>
          )}

          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            className="w-full p-3 border rounded-xl"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
