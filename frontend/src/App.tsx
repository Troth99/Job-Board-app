import { useTheme } from "./hooks/useTheme";
import "./styles/theme.css"


function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>Current theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}

export default App