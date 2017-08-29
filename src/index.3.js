//modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

//reducers
import reducers from './reducers';

//containers
import App from './containers/App';
import CalendarContainer from './containers/CalendarContainer';
import Auth from './containers/Auth/Auth';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';

//const setting
const store = createStore(reducers, compose(applyMiddleware(ReduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) );
const rootElement = document.getElementById('root');

//Render
ReactDOM.render(
    
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={CalendarContainer} />
            </Route>
            <Route path="auth" component={Auth} >
                <IndexRoute component={SignIn} />
                <Route path="signup" component={SignUp} />
            </Route>
        </Router>
    </Provider>
    

    , rootElement
)