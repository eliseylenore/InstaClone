import React, { Component } from "react";
import classnames from "classnames";

export default class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("submitted!");
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.image
              })}
              placeholder="Image url"
              name="image"
              value={this.image}
              onChange={this.onChange}
            />
            {errors.image && (
              <div className="invalid-feedback">{errors.image}</div>
            )}
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.text
              })}
              placeholder="What do you want to say?"
              name="text"
              value={this.text}
              onChange={this.onChange}
            />
            {errors.text && (
              <div className="invalid-feedback">{errors.text}</div>
            )}
          </div>
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    );
  }
}
