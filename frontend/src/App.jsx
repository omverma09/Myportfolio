import Navbar from "./Components/Navbar.jsx"
import About from "./Components/About.jsx"
import Skill from "./Components/Skill.jsx"
import Project from "./Components/Project.jsx"
import Contact from "./Components/Contact.jsx"
import Footer from "./Components/Footer.jsx"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx"

export default function App() {

  return (
    <>
      <Navbar/>
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/project" element={<Project/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/skill" element={<Skill/>}/>
      </Routes>

      <Footer/>
    </>
  )
}