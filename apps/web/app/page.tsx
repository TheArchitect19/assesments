"use client"

import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
  console.log(process.env.DB_NAME)
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const response = await axios.post("http://localhost:8000/auth/login",
        {
          email: email,
          password: password,
        });
      console.log(response)
      console.log("Login Success! Token: " + response.data.data.token);
      localStorage.setItem("token", response.data.data.token)
      router.replace('/welcome')
    } catch (error: any) {
      console.error("Login Failed: " + error.response.data.message);
    }
  };

  const handleSignup = async () => {
    try {
      console.log(email, password)
      const response = await axios.post("http://localhost:8000/auth/signup", {
        email: email,
        password: password,
      });
      console.log("Sign Up Success! Token: " + response.data.data.token);
    } catch (error: any) {
      console.error("Sign Up Failed: " + error.response?.data?.message || error.message);
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const googleToken = response.credential;
      console.log(googleToken);

      const responseFromBackend = await axios.post("http://localhost:8000/auth/google/login", {
        token: googleToken
      });
      localStorage.setItem('token', responseFromBackend.data.token);
      router.replace('/welcome')
      console.log("Google Login Success! Token: " + responseFromBackend.data.token);
    } catch (error: any) {
      console.error("Google Login Failed: " + error.response?.data?.message || error.message);
    }
  };
  
  const handleGoogleLoginFailure = (error: any) => {
    alert("Google Login Failed: " + error.error);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Login / Sign Up</h1>


        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>


        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          >
            Sign Up
          </button>
        </div>


        <div className="mt-6">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap
            shape="pill"
            width="auto"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
