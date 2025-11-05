import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Hero from "./components/HeroSection/Hero";

import "./styles/global.css"


function App() {

  return (
    <div>
      <Header />
        <Hero />
        <h2>To do JOB-Lists applications + filter</h2>
       <Footer />
    </div>
  );
}

export default App