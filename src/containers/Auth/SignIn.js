import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router-dom';
import * as actions from '../../reducers/Auth';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        this.props.loginRequest(this.state.userID, this.state.password)
        .then( () => {
            if( this.props.is_logged_in == 'Success' ) {
                Materialize.toast('Login', 2500);
                // browserHistory.push('/');
                this.props.history.push('/');
            } else {
                let message = '';
                switch( this.props.is_logged_in ) {
                    case 'EMPTY_ID': message = 'Please write your ID'; break;
                    case 'EMPTY_PASSWORD': message = 'Please write Password'; break;
                    case 'NOT_EXIST_USER': message = 'Not Exist User. Check ID'; break;
                    case 'INCORRECT_PASSWORD': message = 'Incorrect Password'; break;
                    default: message = 'Something Wrong';
                }
                Materialize.toast(message, 2500);
            }
        })
    }

    render() {
        return (
            <div className="row SignBox">
                
                <input className="input-field col s8 m6 l4 xl4 offset-s2-m3-l4-xl4" 
                        type="text" 
                        placeholder="User ID" 
                        name="userID" value={this.state.userID}
                        onChange={this.handleChange} />
                <input className="input-field col s8 m6 l4 xl4" 
                        type="text" 
                        placeholder="Password" 
                        name="password" value={this.state.password}
                        onChange={this.handleChange} />
                <button className="waves-effect waves-light btn"
                        onClick={this.handleLogin} > LogIn </button>
                <Link to={`${this.props.match.url}/signup`} className="waves-effect waves-light btn"> Register </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    is_logged_in: state.Auth.get('is_logged_in')
})

const mapDispatchToProps = (dispatch) => ({
    loginRequest: (userID, password) => dispatch(actions.LoginRequest(userID, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);