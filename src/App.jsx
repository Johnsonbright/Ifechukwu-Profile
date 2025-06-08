import Navbar from "./components/Navbar/Navbar";
import Intro from './components/Intro/Intro';
import Skill from "./components/Skills/Skill";
import Work from "./components/Works/Work";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";



function App() {
  

  return (
    <div className="App">
      <Navbar />
      <Intro />
      <Skill/>
      <Work/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
