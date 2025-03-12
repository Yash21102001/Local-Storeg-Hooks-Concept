import { useEffect, useState } from 'react'
// import './App.css'
import Header from "./components/Header"
import Counter from './components/Counter'
import ThemeToggel from "./components/ThemeToggle"
import TodoList from './components/TodoList'
import UserProfile from './components/UserProfile'
import FruitList from './components/FruitList'
const styles = {
  light: {
    bg: "#F5F7FA",       // Soft off-white (background)
    text: "#2D3748",     // Dark gray (text)
    card: "#FFFFFF",     // Pure white (card background)
    border: "#CBD5E0"    // Light gray (border)
  },

  dark: {
    bg: "#1A202C",       // Deep charcoal (background)
    text: "#E2E8F0",     // Light gray-blue (text)
    card: "#2D3748",     // Dark gray-blue (card background)
    border: "#4A5568"    // Medium gray (border)
  }
};


function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  })

  const [activeTab, setActiveTab] = useState("home")

  const ThemeToggle = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  } 

  useEffect(() => {
    document.body.style.backgroundColor = styles[theme].bg;
    document.body.style.color = styles[theme].text;
  }, [theme])

  const containerStyle = {
    minWidth: "1000px",
    top: "0",
  }

  const mainStyle = {
    backgroundColor: styles[theme].card,
  };

  const footerStyle = {
    marginTop: "40px",
    textAling: "center",
    fontsize: "15px"
  };

  return (

    <div style={containerStyle}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
      <main style={mainStyle}>
        {activeTab == "home" && (
          <div style={{ textAlign: "center" }}>
            <h1>React Concept</h1>
            <p>List and keys</p>
            <p>Refs</p>
            <p>Fragments</p>
            <p>State and Props</p>
            <p>Hooks</p>
          </div>
        )}
      </main>
      {activeTab === "counter" && < Counter theme={theme} />}
      {activeTab === "todo" && < TodoList theme={theme} />}
      {activeTab === "profile" && < UserProfile theme={theme} />}
      {activeTab === "fruits" && < FruitList theme={theme} />}
      <ThemeToggel theme={"theme"} ThemeToggle={ThemeToggle} />
    </div>
  )
}

export default App
