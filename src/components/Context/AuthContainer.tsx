import { ReactNode, createContext, useEffect, useReducer } from "react"


export const AuthContext = createContext({});

function initialAuthState() {
    const authData = localStorage.getItem('auth');

    if (authData) {
        try {
            return JSON.parse(authData);
        } catch (error) {
            console.error('Error parsing auth data:', error);
        }
    } else {
        return {authenticated: false, username: null, email: null, imageSrc: null};
    }
}

interface ActionInterface {
    type: string,
    payload: object
}

type Props = {
    children: ReactNode
}

function authReducer(state: object, action: ActionInterface) {
    switch(action.type) {
        case 'LOGIN':
            return {...action.payload};
        case 'LOGOUT':
            return {...state, authenticated: false, username: null, email: null};
        case 'UPDATE':
            return {...state, ...action.payload};
        default :
            return state;
    }
}

export const AuthContainer = ({children}: Props) => {

    const [auth, authDispatch] = useReducer(authReducer, initialAuthState());

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return(
        <AuthContext.Provider value={{auth, authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
}