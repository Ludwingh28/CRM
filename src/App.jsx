import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700">Hola Samuelito</h1>
        <p className="mt-3 text-sm text-gray-600">Hecho con Tailwind + React</p>
      </div>
    </div>
  );
}

export default App;
