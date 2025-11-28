import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import LostItem from "./pages/LostItem.jsx";
import FoundItem from "./pages/FoundItem.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import SignIn from "./pages/SignIn.jsx";


export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* white glass card */}
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-lg p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lost" element={<LostItem />} />
            <Route path="/found" element={<FoundItem />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
