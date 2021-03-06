//modules
import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

//reducers
import reducers from './reducers';

//containers
import App from './containers/App';
//import CalendarContainer from './containers/CalendarContainer';
import Auth from './containers/Auth/Auth';

//const setting
const store = createStore(reducers, applyMiddleware(ReduxThunk));
//const store = createStore(reducers, compose(applyMiddleware(ReduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) );
const rootElement = document.getElementById('root');

//Render
ReactDOM.render(
    
    <Provider store={store}>
        <Router>
            <div>
                <Switch>

                    <Route path="/auth" component={Auth} />
                    <Route path="/" component={App} />
                    
                </Switch>
            </div>
        </Router>
    </Provider>

    , rootElement
)
