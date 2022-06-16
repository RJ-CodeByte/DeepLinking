import { USERS_LIST } from "../../config/urls";
import types from "../types";


export const usersData = () => {
    try {
        return async dispatch => {
            const result = await fetch(USERS_LIST)
            const json = await result.json();
            console.log('json', json.data)
            dispatch({
                type: types.USERS_DATA,
                payload: json.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const userId = id => {
    try {
        return async dispatch => {
            const result = await fetch(USERS_LIST.concat(`/${id}`))
            const json = await result.json();
            console.log('json', json)
            dispatch({
                type: types.USER_PROFILE,
                payload: json.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}