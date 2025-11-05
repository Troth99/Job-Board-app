
import { Header } from "./components/Header/header";
import Hero from "./components/HeroSection/hero";
import { useTheme } from "./hooks/useTheme";
import "./styles/global.css"


function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <Header />
        <Hero />
    </div>
  );
}

export default App