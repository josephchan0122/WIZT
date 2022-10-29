import * as Actions from '../actions';

const initialState = {
    success: false,
    error  : ""
};

const login = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.LOGIN_SUCCESS:
        {
            return {
                ...initialState,
                success: true
            };
        }
        case Actions.LOGIN_ERROR:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        case Actions.ADMIN_LOGGED_OUT:
        {
            return {
                ...initialState,
                success: false,
            };
        }
        default:
        {
            return state
        }
    }
};

export default login;