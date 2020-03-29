import React, { Component } from "react";
import Posts from "./Posts";
import CreatePost from "./CreatePost";

export default class extends Component {
  render() {
    return (
      <div>
        <div className="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Dashboard</h1>
                <CreatePost />
                <Posts />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
