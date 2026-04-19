"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import {
  FaUserCircle,
  FaEye,
  FaEyeSlash,
  FaHospitalUser,
} from "react-icons/fa";

export default function LandingPage() {
  const [view, setView] = useState("Landing");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    
    if (response.ok) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
      alert("Login successful! " + data.message);
      
      
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    console.error("Error connecting to backend:", error);
    alert("Backend can't connect.");
  }

   
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm flex flex-col items-center">
        {view === "Landing" ? (
          <>
            {/* image */}
            <div className="mb-8">
              <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
                <FaHospitalUser className="text-green-600" />
              </div>
            </div>

            {/* Text */}
            <h1 className="text-2xl font-bold text-primary mb-2">
              Private Coaching
            </h1>
            <p className="text-gray-600 text-center text-sm mb-6">
              Add one-on-one, confidential sessions for only $35 per session
            </p>

            {/*horizontal lines*/}
            <div className="flex gap-1 w-60 mb-10">
              <div className="h-1 w-1/3 bg-green-600 rounded-full"></div>
              <div className="h-1 w-1/3 bg-green-600 rounded-full"></div>
              <div className="h-1 w-1/3 bg-gray-200 rounded-full"></div>
            </div>

            {/* Buttons */}
            <button className="w-full py-3 border border-gray-300 rounded-full flex items-center justify-center gap-2 mb-3 font-medium">
              <FcGoogle text-3xl />
              Continue with Google
            </button>

            <button className="w-full py-3 bg-secondary text-primary rounded-full flex items-center justify-center gap-2 mb-3 font-medium">
              <FaApple text-3xl />
              Continue with Apple
            </button>

            <button className="w-full py-3 bg-soft-gray rounded-full flex items-center justify-center gap-2 mb-6 font-medium">
              <FaUserCircle text-3xl />
              Continue As Guest
            </button>

            <p className="text-sm mt-4">
              Already have an account?{" "}
              <span
                className="text-primary font-bold cursor-pointer underline"
                onClick={() => setView("Login")}
              >
                Log in
              </span>
            </p>
          </>
        ) : (
          <>
            {/* Login form */}
            <div className="w-full">
              <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

              <div className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-12 py-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:border-primary transition-all"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <p className="text-right text-sm text-gray-500 cursor-pointer">
                    Forgot Password?
                  </p>

                  <button className="w-full py-4 bg-primary text-white rounded-full font-bold mt-4 cursor-pointer">
                    Login
                  </button>
                </form>
                <div className="text-center text-gray-400 my-4 text-sm">or</div>

                {/*Login Buttons */}
                <button className="w-full py-3 border border-gray-300 rounded-full flex items-center justify-center gap-2 mb-3 font-medium">
                  <FcGoogle text-3xl />
                  Continue with Google
                </button>
                <button className="w-full py-3 bg-secondary text-primary rounded-full flex items-center justify-center gap-2 mb-3 font-medium">
                  <FaApple text-3xl />
                  Continue with Apple
                </button>
                <button className="w-full py-3 bg-soft-gray rounded-full flex items-center justify-center gap-2 mb-6 font-medium">
                  <FaUserCircle text-3xl />
                  Continue As Guest
                </button>
              </div>

              <p className="text-center text-sm mt-8">
                Need an account?{" "}
                <span
                  className="text-primary font-bold cursor-pointer"
                  onClick={() => setView("onboarding")}
                >
                  Sign up
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
