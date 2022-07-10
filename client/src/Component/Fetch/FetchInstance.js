import jwt_decode from "jwt-decode"
import Dayjs from "dayjs"


let originalRequest = async (url, config) => {
    let response = await fetch(url, config)
    let data = await response.json()
    console.log("requesting : ", data)
    return {response, data}
}

let refreshToken = async (refreshToken) => {

    let response = await fetch(`${process.env.REACT_APP_API_ANIME}/VOD/user/refreshToken`, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${refreshToken}`
        }
    })
    let data = await response.json()
    localStorage.setItem("token", JSON.stringify(data.accessToken))
    return data
}

let customFetcher = async (url, config = {}) => {
    let token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
    let refreshedToken = localStorage.getItem("refreshToken") ? JSON.parse(localStorage.getItem("refreshToken")) : null

    const user = jwt_decode(token)
    const isExpired = Dayjs.unix(user.exp).diff(Dayjs()) < 1;

    if(isExpired){
        token = await refreshToken(refreshedToken)
    }
    console.log(isExpired)

    config["headers"] = {
        Authorization: `Bearer ${token ? token : null}`
    }

    console.log("before request")
    let {response, data} = await originalRequest(url, config)
    console.log("after request")
    return {response, data}

}


export default customFetcher