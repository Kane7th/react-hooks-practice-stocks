import React from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer({ stocks, portfolio, onBuyStock, onSellStock, onSortChange, onFilterChange }) {
  return (
    <div>
      <SearchBar onSortChange={onSortChange} onFilterChange={onFilterChange} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} onStockClick={onBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onStockClick={onSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;