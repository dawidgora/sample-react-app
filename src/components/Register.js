import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {registerUser} from "../actions/AuthAction";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            email: '',
            password: '',
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.registerUser({
            email: this.state.email,
            password: this.state.password
        }, response => {
            if (response.error !== undefined) {
                alert(response.error.message);
            } else {
                this.setState({redirect: '/'});
            }
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email"
                               className="form-control"
                               placeholder="Enter email"
                               value={this.state.email}
                               onChange={e => this.setState({email: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                               className="form-control"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={e => this.setState({password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }
}

export default connect(null, {registerUser})(Register);