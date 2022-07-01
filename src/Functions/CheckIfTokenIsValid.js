import axios from "axios"

export async function checkIfTokenIsValid() {
    const tokenCheck = await axios.get("usersSignedInStatus/api/checkTokenValidity")
    if (tokenCheck.data === "TOKEN SUCCESSFUL") {
        return "USER CAN PASS"
    } else {
        return "USER CANNOT PASS"
    }
}