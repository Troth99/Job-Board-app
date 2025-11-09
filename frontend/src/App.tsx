import CategoriesSection from "./components/CategoriesSection/CategoriesSection";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Hero from "./components/HeroSection/Hero";

import "./styles/global.css"


function App() {

  return (
    <div>
      <Header />
        <Hero />
          <CategoriesSection />
       <Footer />
    </div>
  );
}

export default App