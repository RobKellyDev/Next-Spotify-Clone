import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/styles/user_header.sass";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/images/search.svg";

export default connect((state) => state)(function UserInfoHeader({ user }) {
  const [sticky, setsticky] = useState(true);
  const [isSearchPage, setisSearchPage] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.split("/")[1] === "search") {
      setisSearchPage(true);
    } else {
      setisSearchPage(false);
    }
  }, [pathname]);
  // useEffect(() => {
  // if (scrollY > 70) {
  // setsticky(true);
  // }
  // if (scrollY < 60) {
  // setsticky(false);
  // }
  // }, [scrollY]);

  return (
    <header
      id="user-actions_info-header"
      className={`px-3 py-4 ${sticky ? "sticky-top" : ""}`}
    >
      <div className="container ">
        <div className="row align-items-center">
          <div className="col-6">
            <div className=" d-none d-md-flex align-items-center app-navigation-btns-container">
              <div className="btns d-flex">
                <button className="navigate-btn nav-prev" disabled>
                  <i className="fal fa-chevron-left"></i>
                </button>
                <button className="navigate-btn nav-next">
                  <i className="fal fa-chevron-right"></i>
                </button>
              </div>
              {isSearchPage ? (
                <div className="search-form-area">
                  <form id="search_form">
                    <div className="search-input-container">
                      <label className="d-none" htmlFor="search-input"></label>
                      <SearchIcon />
                      <input
                        id="search-input"
                        type="text"
                        placeholder="Artists, songs or podcasts"
                      />
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-12 col-md-6 align-items-center">
            <div className="user-actions-container justify-content-sm-end">
              <div className="account_logout-btns">
                <Link to={"/account"} className="user-profile-link">
                  <div className="me-3 user-avatar-wrapper">
                    <img src={user?.images[0]?.url} alt="user-avatar" />
                  </div>
                  <span className="username">{user?.display_name}</span>
                </Link>
                <a
                  className="logout-link-btn"
                  href={"logout"}
                  onClick={(e) => {
                    e.preventDefault();
                    window.localStorage.setItem("token", null);
                    window.location.reload();
                  }}
                >
                  <i className="fal fa-power-off"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
