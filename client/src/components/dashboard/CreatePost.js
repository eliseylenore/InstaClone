import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { createPost } from "../../actions/postActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      photo: "",
      text: "",
      date: Date.now(),
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
    const post = {
      photo: this.state.photo,
      password: this.state.text,
      date: Date.now()
    };
    console.log("submitted!");
    this.props.createPost(post);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
                "is-invalid": errors.photo
              })}
              placeholder="Photo url"
              name="photo"
              value={this.photo}
              onChange={this.onChange}
            />
            {errors.photo && (
              <div className="invalid-feedback">{errors.photo}</div>
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

// make sure that these two types are available before registerUser action is loaded
CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createPost })(withRouter(CreatePost));
