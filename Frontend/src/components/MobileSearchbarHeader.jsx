import React, { useState } from "react";
import "./style/mobilesearchbarheader.css";

function MobileSearchbarHeader() {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <>
      <div className="mobile-searchbar-header-container">
        <div className="mobile-search-bar">
          <input placeholder="Search..." type="text" name="search" />
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
          >
            <path
              d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2938 12.5697 16.0025 10.8204 16 9C16 5.133 12.867 2 9 2C5.133 2 2 5.133 2 9C2 12.867 5.133 16 9 16C10.8204 16.0025 12.5697 15.2938 13.875 14.025L14.025 13.875Z"
              fill="black"
            />
          </svg>
        </div>
        <button className="mobile-filter">
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setShowFilter(!showFilter)}
          >
            <path
              d="M1 4H4M4 4C4 3.068 4 2.602 4.152 2.235C4.25251 1.99218 4.3999 1.77155 4.58572 1.58572C4.77155 1.3999 4.99218 1.25251 5.235 1.152C5.602 1 6.068 1 7 1C7.932 1 8.398 1 8.765 1.152C9.00782 1.25251 9.22845 1.3999 9.41428 1.58572C9.6001 1.77155 9.74749 1.99218 9.848 2.235C10 2.602 10 3.068 10 4C10 4.932 10 5.398 9.848 5.765C9.74749 6.00782 9.6001 6.22845 9.41428 6.41428C9.22845 6.6001 9.00782 6.74749 8.765 6.848C8.398 7 7.932 7 7 7C6.068 7 5.602 7 5.235 6.848C4.99218 6.74749 4.77155 6.6001 4.58572 6.41428C4.3999 6.22845 4.25251 6.00782 4.152 5.765C4 5.398 4 4.932 4 4ZM1 14H7M16 14H19M16 14C16 13.068 16 12.602 15.848 12.235C15.7475 11.9922 15.6001 11.7716 15.4143 11.5857C15.2284 11.3999 15.0078 11.2525 14.765 11.152C14.398 11 13.932 11 13 11C12.068 11 11.602 11 11.235 11.152C10.9922 11.2525 10.7716 11.3999 10.5857 11.5857C10.3999 11.7716 10.2525 11.9922 10.152 12.235C10 12.602 10 13.068 10 14C10 14.932 10 15.398 10.152 15.765C10.2525 16.0078 10.3999 16.2284 10.5857 16.4143C10.7716 16.6001 10.9922 16.7475 11.235 16.848C11.602 17 12.068 17 13 17C13.932 17 14.398 17 14.765 16.848C15.0078 16.7475 15.2284 16.6001 15.4143 16.4143C15.6001 16.2284 15.7475 16.0078 15.848 15.765C16 15.398 16 14.932 16 14ZM13 4H19"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className={`mobile-filter-dropdown ${showFilter && "show-dropdown"}`}>
        <h3>Filter</h3>
        <select>
          <option value="today">Today</option>
          <option value="all">All</option>
        </select>
        <button className="mobile-filter-dropdown-save-button">Save</button>
      </div>
    </>
  );
}

export default MobileSearchbarHeader;
