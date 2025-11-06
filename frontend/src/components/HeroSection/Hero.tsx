import { useState } from "react";
import "./Hero.css";
import "./Responsive.css"
import Search from "../Search/Search";


export default function Hero() {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query)
  }
  
  return (
    <section className="hero">
      <h1>Find Your Dream Job</h1>
      <p>Thousands of opportunities from top companies are waiting for you.</p>
      <Search onSearch={handleSearch} />
    </section>
  );
}
