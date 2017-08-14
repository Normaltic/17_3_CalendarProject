import React from 'react';
import { connect } from 'react-redux';

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
                {this.props.children}
            </div>

        )
    }
}

export default Auth;