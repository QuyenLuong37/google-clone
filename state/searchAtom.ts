import { atom } from "recoil";

export const searchResultsState = atom({
    key: 'searchResultsState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

export const searchInputState = atom({
    key: 'searchInputState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});