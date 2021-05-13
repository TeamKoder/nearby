import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { useHistory } from "react-router";

const HomeScreen = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (searchText) {
      history.push(`/dashboard?search=${searchText}`);
    } else {
      setError("Enter Your Address");
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    setError("")
  };

  return (
    <>
      <div className="_home">
        <nav className="nav-main-home">
          <div className="nav-logo">
            <span className="nav-menu-logo">
              <HiMenuAlt1 size="1.5rem" />
            </span>
            &nbsp;&nbsp;&nbsp;
            <div className="logo">
              Find Your <span>Location</span>
            </div>
          </div>
          {/* <div className="d-flex align-items-center">
            <button className="btn btn-light rounded-pill">Login</button> */}
            {/* ) : (
              <div className="nav-profile-img">
                <span>AB</span>
              </div>
            )} */}
          {/* </div> */}
        </nav>

        <div className="col-xg-5 col-lg-5 col-md-7 col-10 bg-light p-5 d-flex flex-column align-items-center rounded">
          <input
            type="text"
            placeholder="Enter Address to Find Neighbourhood"
            className="w-100 rounded-pill p-3 border-none home-search-input"
            onChange={handleChange}
            value={searchText}
          />
          <span className="text-danger">{error ? error : ""}</span>
          <button
            className="btn btn-primary mt-4 rounded-pill px-4 py-2"
            onClick={handleSearch}
          >
            Search Neighbourhood
          </button>
        </div>
      </div>
    </>
  );
};

export const Home = HomeScreen;
