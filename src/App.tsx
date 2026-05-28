import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CodDays from "./components/CodDays";
import ExperienceSplit from "./components/ExperienceSplit";
import Specialties from "./components/Specialties";
import Reviews from "./components/Reviews";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";

/* HOME PAGE */
function Home() {
  return (
    <div className="bg-black text-[#f5f5f1] selection:bg-[#c5a059] selection:text-black">
      <Navbar />

      <main>
        <Hero />

        {/* Experience Split (Bar vs Restaurant) */}
        <ExperienceSplit />

        {/* Dynamic Cod Festival Section */}
        <CodDays />

        {/* Featured Products */}
        <Specialties />

        {/* Client Voice */}
        <Reviews />

        {/* Location & Map */}
        <MapSection />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Toaster />
    </>
  );
}