import * as SecureStore from 'expo-secure-store'

export const saveToSecureStore = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
}

export const getValueFromSecureStore = async (key: string) => {
    return await SecureStore.getItemAsync(key);
}

export const removeValueFromSecureStore = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
}