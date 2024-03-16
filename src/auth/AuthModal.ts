// Interface for the authentication state
export interface AuthState {
    isAuthenticated: boolean;
    user: null | User; // Replace 'string' with the actual user data type
}

export interface User {
    id: string; 
    name?: null |  string;
    username?: null | string;
    email?: null | string;
    phoneNumber?: null | string;
    photoURL?: null | string;
    providerId?: null | string;
    userToken?:string
}