import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-sm navbar-light bg-light mb-4 justify-content-between">
        <a className="navbar-brand" href="landing.html">
          InstaClone
        </a>
        <form class="form-inline ">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="register.html">
                Sign Up
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login.html">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
