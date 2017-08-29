import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Signin from './SignIn';
import Signup from './SignUp';

import './Auth.css';

class Auth extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $("#AuthParent").css({
            height: $(window).height()
        })
        $(window).resize( () => {
            $("#AuthParent").css({
                height: $(window).height()
            })
        })
    }

    render() {

        return (

            <div className="row Background grey lighten-3" id="AuthParent">
                <Route exact path={this.props.match.url} component={Signin} />
                <Route exact path={`${this.props.match.url}/signup`} component={Signup} />
            </div>

        )
    }
}

export default Auth;