import React, { useState, useEffect } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [filterBy, setFilterBy] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(res => res.json())
      .then(data => setStocks(data))
      .catch(err => console.error("Error fetching stocks:", err));
  }, []);

  const buyStock = (stock) => {
    if (!portfolio.some(s => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const sellStock = (stock) => {
    setPortfolio(portfolio.filter(s => s.id !== stock.id));
  };

  const sortStocks = (stocksToSort) => {
    if (sortBy === "Alphabetically") {
      return [...stocksToSort].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Price") {
      return [...stocksToSort].sort((a, b) => a.price - b.price);
    }
    return stocksToSort;
  };

  const filterStocks = (stocksToFilter) => {
    if (filterBy) {
      return stocksToFilter.filter(stock => stock.type === filterBy);
    }
    return stocksToFilter;
  };

  const processedStocks = sortStocks(filterStocks(stocks));

  return (
    <div>
      <Header />
      <MainContainer 
        stocks={processedStocks}
        portfolio={portfolio}
        onBuyStock={buyStock}
        onSellStock={sellStock}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />
    </div>
  );
}

export default App;