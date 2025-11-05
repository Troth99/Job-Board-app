import { useState } from "react";
import "./hero.css"
import Search from "../Search/search";


interface heroProps {
  title?: string;
  subtitle?: string;
}
const Hero = ({
  title = "Find Your Dream Job",
  subtitle = "Thousands of opportunities from top companies are waiting for you.",
}: heroProps) => {
    const [search, setSearch] = useState("")

    return (
   <section className="hero">
  <h1>{title}</h1>
  <p>{subtitle}</p>
        <Search onSearch={setSearch} />
</section>
    )
};

export default Hero
