import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import BMI from "./components/BMI";
import CurrencyConverter from "./components/CurrencyConverter";
import Gallery from "./components/Gallery";
import AuthForm from "./components/AuthForm";
import NotepadApp from "./components/NotepadApp";
import PersonalBlog from "./components/PersonalBlog";
import ProfileCard from "./components/ProfileCard";
import Shop from "./components/Shop";
import ToDo from "./components/ToDo";
import WeatherWidget from "./components/WeatherWidget";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bmi" element={<BMI />} />
      <Route path="/currency" element={<CurrencyConverter />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/notepad" element={<NotepadApp />} />
      <Route path="/blog" element={<PersonalBlog />} />
      <Route path="/profile" element={<ProfileCard />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/todo" element={<ToDo />} />
      <Route path="/weather" element={<WeatherWidget />} />
    </Routes>
  );
}

export default App;
