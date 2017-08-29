import React from 'react';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
import * as actions from '../../reducers/Auth';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userID: '',
            password: '',
            name: '',
            intro: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleRegister() {
        let { userID, password, name, intro } = this.state;
        
        this.props.registerRequest(userID, password, name, intro)
        .then( () => {
            if( this.props.is_register == 'Success' ) {
                Materialize.toast('Register', 2500);
                this.props.history.push('/auth');
            } else {
                let message = '';
                switch( this.props.is_register ) {
                    case 'EMPTY_ID': message = "Please write ID"; break;
                    case 'EMPTY_PASSWORD': message = "Please write Password"; break;
                    case 'EMPTY_NAME': message = "Please Write Your Name"; break;
                    default: message = "Something Wrong";
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
                <input className="input-field col s8 m6 l4 xl4"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                <input className="input-box col s8 m6 l4 xl4"
                        type="text"
                        placeholder="Intro"
                        name="intro"
                        value={this.state.intro}
                        onChange={this.handleChange} />

                <button className="waves-effect waves-light btn"
                        onClick={this.handleRegister} > Register </button>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    is_register: state.Auth.get('is_register')
})

const mapDispatchToProps = (dispatch) => ({
    registerRequest: (userID, password, name, intro) => dispatch(actions.RegisterRequest(userID, password, name, intro))
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);