export const BASE_URL = "https://reqres.in/api"

export const getApiurl = (endPoint) => BASE_URL + endPoint

export const USERS_LIST = getApiurl('/users')
