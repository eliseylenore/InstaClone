import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4 mt-4">InstaClone</h1>
                <p className="lead">A clone of Instagram</p>
                <hr />
                <a href="register.html" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </a>
                <a href="login.html" className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
