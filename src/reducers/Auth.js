import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as services from '../services/authService';

//Define Actions
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const SOMETHING_WRONG = 'auth/SOMETHING_WRONG';

//Create Actions
export const Login = createAction(LOGIN); // {}
export const LoginSuccess = createAction(LOGIN_SUCCESS); // { result, token }
export const LoginFailure = createAction(LOGIN_FAILURE); // { result, error }

export const Register = createAction(REGISTER);
export const RegisterSuccess = createAction(REGISTER_SUCCESS); // { result }
export const RegisterFailure = createAction(REGISTER_FAILURE); // { result, error }

export const SomethingWrong = createAction(SOMETHING_WRONG);// { where, err }

//Define Initial State
const initialState = Map({
    is_logged_in: '',
    is_register: '',
    token: ''
})

//thunks
export const LoginRequest = (userID, password) => (dispatch) => {
    dispatch(Login());

    return services.SignIn(userID, password)
           .then( (response) => {
               if( response.data.result ) {
                    services.setHeaderToken(response.data.token);
                    dispatch(LoginSuccess(response.data));
               } else {
                   dispatch(LoginFailure(response.data));
               }
           })
           .catch( (err) => {
               dispatch(SomethingWrong({where: 'is_logged_in', error: err}));
           })
}

export const RegisterRequest = (userID, password, name, intro) => (dispatch) => {
    dispatch(Register());

    return services.SignUp(userID, password, name, intro)
           .then( (response) => {
               if( response.data.result ) {
                   dispatch(RegisterSuccess());
               } else {
                   dispatch(RegisterFailure(response.data));
               }
           })
           .catch( (err) => {
               dispatch(SomethingWrong({where: 'is_register', error: err}));
           })
}

export default handleActions({

    [LOGIN]: (state, action) => {
        return state.set('is_logged_in', 'Waiting');
    },
    [LOGIN_SUCCESS]: (state, action) => {
        services.setHeaderToken(action.payload.token);
        return state.set('is_logged_in', 'Success')
                    .set('token', action.payload.token);
    },
    [LOGIN_FAILURE]: (state, action) => {
        return state.set('is_logged_in', action.payload.error);
    },

    [REGISTER]: (state, action) => {
        return state.set('is_register', 'Waiting');
    },
    [REGISTER_SUCCESS]: (state, action) => {
        return state.set('is_register', 'Success');
    },
    [REGISTER_FAILURE]: (state, action) => {
        return state.set('is_register', action.payload.error);
    },

    [SOMETHING_WRONG]: (state, action) => {
        console.warn(action.payload.error);
        return state.set(action.payload.where, action.payload.error);
    }
}, initialState);