import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
        {/* DevLink Logo */}
        <header className="absolute top-6 left-4 text-xl md:text-2xl font-bold text-black">
          DevLink
        </header>

        <div
          className={`max-w-6xl w-full flex flex-col md:flex-row items-center justify-between transition-all duration-700 ease-out 
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {/* Left Side */}
          <div className="text-center md:text-left space-y-6 max-w-xl w-full mt-20 md:mt-0">
            <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">
              Join our developer <br className="hidden md:block" />
              community
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Connect with other developers to share{" "}
              <br className="hidden md:block" />
              knowledge and grow your network.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-2 items-center md:items-start justify-center md:justify-start">
              <Link to="/login">
                <button className="bg-blue-600 text-white font-semibold w-40 py-3 text-lg hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-white border-2 border-black text-black font-semibold w-40 py-3 text-lg hover:bg-gray-100 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="mt-12 md:mt-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
              alt="Developer"
              className="w-64 md:w-[360px] mx-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
