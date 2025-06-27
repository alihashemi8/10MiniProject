import { Link } from "react-router-dom";
import ToDoList from "./assets/ToDoList.png";
import WeatherWidgetImg from "./assets/WeatherWidget.png";
import ProfileAppimg from "./assets/ProfileAppimg.png";
import LoginFormimg from "./assets/LoginFormimg.png";
import BMIimg from "./assets/BMIimg.png";
import Galleryimg from "./assets/Galleryimg.png";
import Shopimg from "./assets/Shopimg.png";
import NotepadAppimg from "./assets/NotepadAppimg.png";
import PersonalBlogimg from "./assets/PersonalBlogimg.png";
import CurrencyConverterimg from "./assets/CurrencyConverterimg.png";

import Instagram from "./assets/Instagram.svg";
import Telegram from "./assets/Telegram.svg";
import X from "./assets/X.svg";

function Home() {
  const projects = [
    { id: 1, title: "To-do App", description: "Manage daily tasks...", image: ToDoList, link: "/todo" },
    { id: 2, title: "Weather Widget", description: "Get live weather...", image: WeatherWidgetImg, link: "/weather" },
    { id: 3, title: "Profile Card", description: "Modern profile UI...", image: ProfileAppimg, link: "/profile" },
    { id: 4, title: "Login Form", description: "Client-side validation...", image: LoginFormimg, link: "/auth" },
    { id: 5, title: "BMI", description: "Calculate your BMI...", image: BMIimg, link: "/bmi" },
    { id: 6, title: "Gallery", description: "Grid layout gallery...", image: Galleryimg, link: "/gallery" },
    { id: 7, title: "Shop", description: "Basic shop layout...", image: Shopimg, link: "/shop" },
    { id: 8, title: "Personal Blog", description: "Minimal blog layout...", image: PersonalBlogimg, link: "/blog" },
    { id: 9, title: "Notepad App", description: "Take quick notes...", image: NotepadAppimg, link: "/notepad" },
    { id: 10, title: "Currency Converter", description: "Convert currencies...", image: CurrencyConverterimg, link: "/currency" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-200 p-4">
      {/* Title */}
      <div className="text-center my-20 text-3xl font-bold">Hi, I'm Ali Hashemi and here are my 10 mini projects</div>

      {/* Socials */}
      <div className="flex justify-center gap-6 mt-6">
        {[Instagram, Telegram, X].map((icon, i) => (
          <a key={i} href="#" className="hover:scale-105 transition-transform">
            <img src={icon} className="w-10 h-10 rounded-xl hover:drop-shadow-lg" />
          </a>
        ))}
      </div>

      {/* Projects */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gradient-to-r from-[#ddc5d8] to-blue-200 shadow-md hover:shadow-xl rounded-2xl flex flex-col p-4"
          >
            <div className="w-full aspect-[4/3] overflow-hidden rounded-xl group">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <h2 className="text-xl font-semibold mt-4 mb-2 text-center">{project.title}</h2>
            <p className="text-gray-500 text-sm text-center mb-4">{project.description}</p>
            <Link to={project.link} className="mt-auto bg-blue-600 text-white text-sm px-4 py-2 rounded-xl text-center hover:bg-blue-700 transition">
              View Project
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
