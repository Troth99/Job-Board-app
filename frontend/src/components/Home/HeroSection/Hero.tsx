import { useState } from "react";
import "./Hero.css";
import "./Responsive.css";
import Search from "../Search/Search";

export default function Hero() {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <section className="custom-hero" style={{position: 'relative', overflow: 'hidden'}}>
      {/* Abstract SVG background */}
      <svg className="custom-hero-bg" width="100%" height="220" viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '220px', zIndex: 0, pointerEvents: 'none'}}>
        <path d="M0 120 Q360 40 720 120 T1440 120" stroke="#2563eb" strokeWidth="2" fill="none" opacity="0.13"/>
        <path d="M0 180 Q480 260 960 180 T1440 180" stroke="#00bfae" strokeWidth="2" fill="none" opacity="0.10"/>
        <circle cx="120" cy="110" r="10" fill="#2563eb" opacity="0.18" />
        <circle cx="1320" cy="170" r="8" fill="#00bfae" opacity="0.18" />
        <circle cx="700" cy="60" r="6" fill="#fbbf24" opacity="0.18" />
        <circle cx="900" cy="200" r="5" fill="#2563eb" opacity="0.18" />
      </svg>
      <h1 style={{position: 'relative', zIndex: 1}}>
        <span className="accent">Job Board</span> for your next career move.
      </h1>
      
      <p className="custom-hero-subtitle" style={{position: 'relative', zIndex: 1}}>
        Search by keyword in all job postings
      </p>
      <div className="custom-hero-search" style={{position: 'relative', zIndex: 1}}>
        <Search onSearch={handleSearch} />
      </div>

      {/* Extra SVG for more dynamics */}
      <svg className="custom-hero-bg2" width="100%" height="80" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', right: 0, bottom: 0, width: '100%', height: '80px', zIndex: 0, pointerEvents: 'none'}}>
        <ellipse cx="1320" cy="40" rx="60" ry="18" fill="#2563eb" opacity="0.07" />
        <ellipse cx="120" cy="60" rx="40" ry="12" fill="#00bfae" opacity="0.09" />
      </svg>

      {/* Animated scroll down arrow */}
      <div className="custom-hero-scroll-indicator">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" stroke="#2563eb" strokeWidth="2" fill="none" opacity="0.18" />
          <path d="M10 16L16 22L22 16" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
