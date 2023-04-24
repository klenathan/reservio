import {removeCookie} from "typescript-cookie";

const logout = async () => {
    localStorage.clear()
    removeCookie('accessToken')
    removeCookie('refreshToken')
}

export default logout;