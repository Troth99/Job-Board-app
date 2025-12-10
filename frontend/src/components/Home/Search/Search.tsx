import { useState } from "react";
import "./Search.css";
import "./Responsive.css";
import { Job } from "../../../interfaces/Job.model";
import useJobs from "../../../hooks/useJobs";
import SearchResults from "./SearchResults/SearchResults";
import { useNavigate } from "react-router";

interface searchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: searchProps) {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(search)}`);
  };

  return (
    <div className="search-container">
      <form onSubmit={submitHandler}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={searchHandler}
          />
          <button type="submit" className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M10 2a8 8 0 105.293 14.293l4.707 4.707-1.414 1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
