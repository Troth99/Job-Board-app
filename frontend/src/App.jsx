import { useTheme } from "./hooks/userTheme.js";


function App() {
  const { theme, toggleTheme } = useTheme() || {};

  return (
    <div>
      <h1>Current theme: {theme || "light"}</h1>
      <button onClick={toggleTheme ? toggleTheme : () => {}}>Toggle theme</button>
    </div>
  );
}

export default App;