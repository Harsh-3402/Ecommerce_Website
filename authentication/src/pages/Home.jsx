import { Link } from "react-router-dom";
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
} from "lucide-react";

import HeroBanner from "../components/home/HeroBanner";
import CategorySection from "../components/home/CategorySection";
import Footer from "../components/layout/Footer";

const categories = [
  {
    name: "Mobiles",
    description: "Smartphones & more",
    icon: Smartphone,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Laptops",
    description: "Power your work",
    icon: Laptop,
    color: "bg-violet-50 text-violet-600",
  },
  {
    name: "Headphones & Earphones",
    description: "Listen your way",
    icon: Headphones,
    color: "bg-orange-50 text-orange-600",
  },
  {
    name: "Smartwatches & Wearables",
    description: "Stay connected",
    icon: Watch,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Cameras",
    description: "Capture moments",
    icon: Camera,
    color: "bg-pink-50 text-pink-600",
  },
  {
    name: "Gaming",
    description: "Level up your play",
    icon: Gamepad2,
    color: "bg-indigo-50 text-indigo-600",
  },
];

function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-[1600px] space-y-12 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

        <HeroBanner />

        <CategorySection />

        <Footer/>

      </div>
    </main>
  );
}

export default Home;