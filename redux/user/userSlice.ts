import {IUserPayload, IUserState} from "@/interfaces/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeValueFromSecureStore} from "@/utils/secureStore";

const initialState: IUserState = {
    user: null,
    token: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<IUserPayload>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const getUser = (state: { user: IUserState }) => state.user.user;
export const getToken = (state: { user: IUserState }) => state.user.token;
export const { setCredentials, logOut } = userSlice.actions;
export default userSlice.reducer;