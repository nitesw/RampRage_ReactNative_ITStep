export interface IUser {
    id: number;
    username: string;
    email: string;
    role: string;
    imageUrl: string;
    exp: number;
}

export interface ILogin {
    identifier: string;
    password: string;
}
export interface IAuthResponse {
    token: string;
}

export interface IRegister {
    email: string;
    username: string;
    password: string;
    image: File | null;
}

export interface IUserState {
    user: IUser | null;
    token: string | null;
}

export interface IUserPayload {
    user: IUser;
    token: string;
}