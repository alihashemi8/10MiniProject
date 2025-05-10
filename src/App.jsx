import { useState } from "react";
import "./components/App.css";

import ToDoList from "./assets/ToDoList.png";
import WeatherWidgetImg from "./assets/WeatherWidget.png"; 
import ProfileAppimg from "./assets/ProfileAppimg.png"
import LoginFormimg from "./assets/LoginFormimg.png"
import BMIimg  from "./assets/BMIimg.png"
import Galleryimg from "./assets/Galleryimg.png"
import Shopimg from "./assets/Shopimg.png"

import Instagram from "./assets/Instagram.svg";
import Telegram from "./assets/Telegram.svg";
import X from "./assets/X.svg";

import BMI from './components/BMI.jsx';
import CurrencyConverter from './components/CurrencyConverter.jsx';
import Gallery from './components/Gallery.jsx';
import LoginForm from './components/LoginForm.jsx';
import NotepadApp from './components/NotepadApp.jsx';
import PersonalBlog from './components/PersonalBlog.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import Shop from './components/Shop.jsx';
import ToDo from './components/ToDo.jsx';
import WeatherWidget from './components/WeatherWidget.jsx';

function App() {
  const [count, setCount] = useState(0);

  const projects = [
    {
      id: 1,
      title: "To-do App",
      description: "Manage daily tasks with add, edit, and delete functionality.",
      image: ToDoList,
      link: "#",
    },
    {
      id: 2,
      title: "Weather Widget",
      description: "Get live weather updates by city name using OpenWeather API.",
      image: WeatherWidgetImg,
      link: "#",
    },
    {
      id: 3,
      title: "Profile Card",
      description: "A responsive and modern profile UI component with social links.",
      image: ProfileAppimg,
      link: "#",
    },
    {
      id: 4,
      title: "Login Form",
      description: "Clean login form with client-side validation and error handling.",
      image: LoginFormimg,
      link: "#",
    },
    {
      id: 5,
      title: "BMI",
      description: "Calculate your Body Mass Index based on height and weight.",
      image: BMIimg,
      link: "#",
    },
    {
      id: 6,
      title: "Gallery",
      description: "A simple image gallery layout with grid and lightbox effect.",
      image: Galleryimg,
      link: "#",
    },
    {
      id: 7,
      title: "Shop",
      description: "Product showcase with basic cart and price layout (static demo).",
      image: Shopimg,
      link: "#",
    },
    {
      id: 8,
      title: "Personal Blog",
      description: "Minimal blog layout with posts preview and responsive design.",
      image: "https://via.placeholder.com/300x200?text=Color+Picker",
      link: "#",
    },
    {
      id: 9,
      title: "Notepad App",
      description: "A lightweight note-taking app with local storage support.",
      image: "https://via.placeholder.com/300x200?text=Image+Carousel",
      link: "#",
    },
    {
      id: 10,
      title: "Currency Converter",
      description: "Convert currencies using live exchange rates and dropdown inputs.",
      image: "https://via.placeholder.com/300x200?text=Currency+Converter",
      link: "#",
    },
  ];

  return (
    <>
      {/* Heading & Introduce */}
      <div>
        <p className="text-center my-20 text-3xl font-bold drop-shadow-md transition-all hover:drop-shadow-lg text-shadow-red-hover">
          Hi, I'm Ali Hashemi and here are my 10 mini projects
        </p>
      </div>

      <div>
        <p className="text-center text-2xl text-gray-700 mb-6">
          I made these mini projects to improve my web development skills.
        </p>
        <p className="text-center text-xl text-gray-700 mb-6 underline decoration-solid">
          I use Vite and Tailwind, and here is my social media content:
        </p>
      </div>

      {/* Social Media */}
      <div className="flex justify-center gap-6 mt-6">
        <a href="#" className="hover:scale-105 transition-transform">
          <img src={Instagram} alt="Instagram" className="w-10 h-10 rounded-xl hover:drop-shadow-lg" />
        </a>
        <a href="#" className="hover:scale-105 transition-transform">
          <img src={Telegram} alt="Telegram" className="w-10 h-10 rounded-xl hover:drop-shadow-lg" />
        </a>
        <a href="#" className="hover:scale-105 transition-transform">
          <img src={X} alt="X" className="w-10 h-10 rounded-xl hover:drop-shadow-lg" />
        </a>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#f4eaea] shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden flex flex-col p-4"
          >
            <div className="w-full aspect-[4/3] overflow-hidden rounded-xl group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-center text-[#2d2d2d]">
              {project.title}
            </h2>
            <p className="text-gray-500 text-sm text-center mb-4">
              {project.description}
            </p>
            <a
              href={project.link}
              className="mt-auto bg-[#3add91] hover:bg-[#2fb879] text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 text-center"
            >
              View Project
            </a>
          </div>
        ))}
      </div>

      {/* Components Section */}
      <BMI />
      <CurrencyConverter />
      <Gallery />
      <LoginForm />
      <NotepadApp />
      <PersonalBlog />
      <ProfileCard />
      <Shop />
      <ToDo />
      <WeatherWidget />
    </>
  );
}

export default App;
