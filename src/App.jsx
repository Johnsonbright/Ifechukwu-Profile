import Navbar from "./components/Navbar/Navbar";
import Intro from './components/Intro/Intro';
import Skill from "./components/Skills/Skill";
import Work from "./components/Works/Work";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import TechNews from "./components/TechNews";
import { useState, useEffect } from 'react';


function App() {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        const utterance = new SpeechSynthesisUtterance('Welcome');
        window.speechSynthesis.speak(utterance);
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);
  

  return (
    <div className="App">
      <Navbar />
      <Intro />
      <Skill/>
      <Work/>
      <Contact/>
      <TechNews/>
      <Footer/>
    </div>
  )
}

export default App
