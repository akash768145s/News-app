import React, { useEffect, useState } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log(jsonData.articles);

      if (jsonData.articles) {
        setNewsData(jsonData.articles.slice(0, 10));
      } else {
        console.error("No articles found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const userInput = (event) => {
    setSearch(event.target.value);
    getData(); // Fetch new data based on category
  };

  return (
    <div>
      <nav>
        <div>
          <h1>Trendy News</h1>
        </div>
        <ul style={{ display: "flex", gap: "11px" }}>
          <a href="#" style={{ fontWeight: 600, fontSize: "17px" }}>
            All News
          </a>
          <a href="#" style={{ fontWeight: 600, fontSize: "17px" }}>
            Trending
          </a>
        </ul>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
          />
          <button onClick={getData}>Search</button>
        </div>
      </nav>
      <div>
        <p className="head">Stay Updated with TrendyNews</p>
      </div>
      <div className="categoryBtn">
        <button onClick={userInput} value="technology">
          Technology
        </button>
        {/* Uncomment additional categories as needed */}
        {/* <button onClick={userInput} value="sports">Sports</button> */}
        {/* <button onClick={userInput} value="politics">Politics</button> */}
        {/* <button onClick={userInput} value="entertainment">Entertainment</button> */}
        {/* <button onClick={userInput} value="health">Health</button> */}
        {/* <button onClick={userInput} value="fitness">Fitness</button> */}
        {/* <button onClick={userInput} value="business">Business</button> */}
      </div>
      <div>{newsData ? <Card data={newsData} /> : <p>Loading...</p>}</div>
    </div>
  );
};

export default Newsapp;
