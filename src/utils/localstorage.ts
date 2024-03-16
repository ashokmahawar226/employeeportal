import { User } from "../auth/AuthModal";

const ROOT = "fcroot";
export interface ILocalStorage {
   user?:User
};


export const getLocalStorageItem = (key: string, defaultValue?: string): string => {
    try {
        return localStorage.getItem(key) || defaultValue || "";
    } catch (e) {
        return defaultValue || "";
    }
};

export const setLocalStorageItem = (key: string, value: string) => {
    try {
        return localStorage.setItem(key, value);
    } catch (e) {
        return null;
    }
};

export const removeLocalStorageItem = (key: string) => {
    try {
        return localStorage.removeItem(key);
    } catch (e) {
        return null;
    }
};

export const getLocalData = () => {
    return JSON.parse(getLocalStorageItem(ROOT, "{}"));
};

export const setLocalData = (value = {}) => {
    if (typeof value === "object" && !Array.isArray(value)) {
        let data = {...getLocalData(), ...value};
        return setLocalStorageItem(ROOT, JSON.stringify(data));
    } else {
        alert("Value must be OBJECT like {key: value}");
    }
};

export const rootStorage = () => {
    const getLocalStorage: ILocalStorage = getLocalData();
    const setLocalStorage = (value: ILocalStorage) => setLocalData(value);
    return {getLocalStorage, setLocalStorage};
};