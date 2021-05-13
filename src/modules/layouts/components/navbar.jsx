import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { HiMenuAlt1, HiSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import Sidebar from "./sidebar";

const Navbar = (props) => {
  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);
  const [show, setShow] = useState(true);
  const [detail, setDetail] = useState({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (Cookies.get("userName")) {
      setShow(false);
    }
  }, []);

  const handleSidebar = () => setSidebar(!sidebar);

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleSubmit = () => {
    Cookies.set("userName", detail.name);
    Cookies.set("userEmail", detail.email);
    Cookies.set("userPhone", detail.mobileno);
    setShow(false);
  };

  const handleSearch = async () => {
    if (searchText) {
      history.push({
        pathname: "/dashboard",
        search: "?search=" + searchText,
      });
      await props.searchAmi()
    }
  };

  return (
    <>
      <nav className="nav-main">
        <div className="nav-logo">
          <span
            className={
              !sidebar ? "nav-menu-logo" : "nav-menu-logo nav-menu-logo-active"
            }
            onClick={handleSidebar}
          >
            {!sidebar ? (
              <HiMenuAlt1 size="1.5rem" className="_menu-icon" />
            ) : (
              <VscChromeClose size="1.5rem" className="_menu-icon" />
            )}
          </span>
          &nbsp;&nbsp;&nbsp;
          <div className="logo">
            Find Your <span>Location</span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div>
            <label className="ml-2 search-label">
              Search Another Neighbourhood
            </label>
            <div className="nav-search-bar rounded-pill mr-4 px-2 py-1">
              <input
                type="text"
                className="search-input"
                placeholder="Enter Another Location address"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <span className="ml-2 d-flex" onClick={handleSearch}>
                <HiSearch size="1.5rem" />
              </span>
            </div>
          </div>
          {!Cookies.get("userName") ? (
            <div className="nav-profile-img" onClick={() => setShow(true)}>
              <span>U</span>
            </div>
          ) : (
            <div className="nav-profile-img">
              <span>AB</span>
            </div>
          )}
        </div>
      </nav>
      <Sidebar active={sidebar} />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div
            className="px-4 d-flex justify-content-end close_btn"
            onClick={() => setShow(false)}
          >
            {/* <button className="submit_btn px-4 py-2"> */}
            <AiOutlineClose size="1.8em" />
            {/* </button> */}
          </div>
          <div className="p-4 form_input">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-100"
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-100 mt-4"
              onChange={handleChange}
            />
            <input
              type="text"
              name="mobileno"
              placeholder="Phone Number (Optional)"
              className="w-100 mt-4"
              onChange={handleChange}
            />
          </div>
          <div className="px-4 d-flex justify-content-end">
            <button className="submit_btn px-4 py-2" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
