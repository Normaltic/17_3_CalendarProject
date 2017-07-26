//modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//reducers
import reducers from './reducers';

//components
import App from './containers/App';

//containers
import CalendarContainer from './containers/CalendarContainer'

//const setting
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );
const rootElement = document.getElementById('root');

//Render
ReactDOM.render(
    
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={CalendarContainer} />

            </Route>
        </Router>
    </Provider>
    

    , rootElement
)